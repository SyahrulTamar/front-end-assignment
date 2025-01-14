import { defineStore } from 'pinia'
import client from '../apollo/apollo'
import { GET_ALL_DATA, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../graphql/queries'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf()

export const useProductStore = defineStore('product', {
  state: () => ({
    categories: [],
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    // Fetch All Data
    async fetchAllData() {
      this.loading = true
      this.error = null
      try {
        const { data } = await client.query({
          query: GET_ALL_DATA,
        })
        this.categories = data.categories || []
        this.products = data.products || []
        notyf.success('Data fetched successfully!')
      } catch (error) {
        console.error('Error fetching data:', error)
        this.error = 'Failed to fetch data. Please try again later.'
        notyf.error('Failed to fetch data.')
      } finally {
        this.loading = false
      }
    },

    // Add Product
    async addProduct(product) {
      this.error = null

      // Validasi di Store
      if (
        !product.name ||
        product.price <= 0 ||
        product.price > 99999999.99 ||
        product.quantity <= 0
      ) {
        notyf.error('Invalid product data! Ensure name, price, and quantity are valid.')
        return
      }

      try {
        const { data } = await client.mutate({
          mutation: ADD_PRODUCT,
          variables: {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            category_id: product.category_id || null,
          },
        })

        const newProduct = JSON.parse(JSON.stringify(data.insert_products_one))

        this.products = [newProduct, ...this.products]

        notyf.success('Product added successfully!')
      } catch (error) {
        console.error('Error adding product:', error)
        this.error = 'Failed to add product. Please try again.'
        notyf.error('Failed to add product.')
      }
    },

    // Update Product
    async updateProduct(product) {
      this.error = null

      // Validasi di Store
      if (
        !product.name ||
        product.price <= 0 ||
        product.price > 99999999.99 ||
        product.quantity <= 0
      ) {
        notyf.error('Invalid product data! Ensure name, price, and quantity are valid.')
        return
      }

      try {
        const { data } = await client.mutate({
          mutation: UPDATE_PRODUCT,
          variables: {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            category_id: product.category_id || null,
          },
        })

        const updatedProduct = JSON.parse(JSON.stringify(data.update_products_by_pk))

        const index = this.products.findIndex((p) => p.id === product.id)
        if (index !== -1) this.products[index] = updatedProduct

        notyf.success('Product updated successfully!')
      } catch (error) {
        console.error('Error updating product:', error)
        this.error = 'Failed to update product. Please try again.'
        notyf.error('Failed to update product.')
      }
    },

    // Delete Product
    async deleteProduct(productId) {
      this.error = null

      try {
        await client.mutate({
          mutation: DELETE_PRODUCT,
          variables: { id: productId },
        })

        this.products = this.products.filter((p) => p.id !== productId)

        notyf.success('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        this.error = 'Failed to delete product. Please try again.'
        notyf.error('Failed to delete product.')
      }
    },
  },
})
