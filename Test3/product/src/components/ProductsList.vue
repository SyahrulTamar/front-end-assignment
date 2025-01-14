<template>
  <div>
    <h1 class="text-3xl font-bold mt-10 mb-8">Product List</h1>

    <!-- Button Add Product -->
    <div class="mb-4 text-right">
      <button
        @click="openAddModal"
        class="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
      >
        Add Product
      </button>
    </div>

    <!-- Daftar Produk -->
    <div v-if="loading" class="text-center text-lg text-blue-500">Loading...</div>
    <div v-if="error" class="text-center text-lg text-red-500">
      Error loading products: {{ error }}
    </div>
    <div class="container mx-auto p-4">
      <div
        v-if="products && products.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white shadow-md rounded-lg overflow-hidden border"
        >
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
            <p class="text-gray-500 mt-2">
              Price: <span class="font-medium">${{ product.price }}</span>
            </p>
          </div>
          <div class="p-4 bg-gray-100 flex justify-end space-x-2">
            <button
              @click="openEditModal(product)"
              class="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(product.id)"
              class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No products available</div>
    </div>

    <!-- Modal Add/Edit Product -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-2xl font-semibold mb-4">
          {{ modalType === 'add' ? 'Add Product' : 'Edit Product' }}
        </h2>
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label class="block font-medium mb-2">Name</label>
            <input
              v-model="editableProduct.name"
              type="text"
              class="border p-2 w-full"
              placeholder="Product Name"
            />
            <small v-if="isSubmitted && !editableProduct.name" class="text-red-500">
              Product name is required.
            </small>
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-2">Price</label>
            <input
              v-model.number="editableProduct.price"
              type="number"
              class="border p-2 w-full"
              placeholder="Price"
              step="0.01"
              min="0.01"
              max="99999999.99"
            />
            <small
              v-if="
                isSubmitted && (editableProduct.price <= 0 || editableProduct.price > 99999999.99)
              "
              class="text-red-500"
            >
              Price must be between $0.01 and $99,999,999.99.
            </small>
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-2">Quantity</label>
            <input
              v-model.number="editableProduct.quantity"
              type="number"
              class="border p-2 w-full"
              placeholder="Quantity"
              min="1"
            />
            <small v-if="isSubmitted && editableProduct.quantity <= 0" class="text-red-500">
              Quantity must be greater than 0.
            </small>
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-2">Category</label>
            <select v-model="editableProduct.category_id" class="border p-2 w-full">
              <option value="" disabled>Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <small v-if="isSubmitted && !editableProduct.category_id" class="text-red-500">
              Please select a category.
            </small>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()

    const isModalOpen = ref(false)
    const modalType = ref('add') // 'add' atau 'edit'
    const isSubmitted = ref(false) // Melacak apakah form sudah disubmit
    const editableProduct = ref({
      name: '',
      price: 0,
      quantity: 0,
      category_id: null,
    })

    const openAddModal = () => {
      modalType.value = 'add'
      editableProduct.value = {
        name: '',
        price: 0,
        quantity: 0,
        category_id: null,
      }
      isModalOpen.value = true
      isSubmitted.value = false // Reset state submitted
    }

    const openEditModal = (product) => {
      modalType.value = 'edit'
      editableProduct.value = { ...product }
      isModalOpen.value = true
      isSubmitted.value = false // Reset state submitted
    }

    const closeModal = () => {
      isModalOpen.value = false
      editableProduct.value = {
        name: '',
        price: 0,
        quantity: 0,
        category_id: null,
      }
      isSubmitted.value = false // Reset state submitted
    }

    const saveProduct = async () => {
      isSubmitted.value = true // Tandai form sudah disubmit

      // Validasi form
      if (
        !editableProduct.value.name ||
        editableProduct.value.price <= 0 ||
        editableProduct.value.price > 99999999.99 ||
        editableProduct.value.quantity <= 0 ||
        !editableProduct.value.category_id
      ) {
        return
      }

      if (modalType.value === 'add') {
        await productStore.addProduct(editableProduct.value)
      } else if (modalType.value === 'edit') {
        await productStore.updateProduct(editableProduct.value)
      }
      closeModal()
    }

    const deleteProduct = async (productId) => {
      await productStore.deleteProduct(productId)
    }

    onMounted(() => {
      productStore.fetchAllData()
    })

    return {
      products: computed(() => productStore.products),
      categories: computed(() => productStore.categories),
      loading: computed(() => productStore.loading),
      error: computed(() => productStore.error),
      isModalOpen,
      modalType,
      isSubmitted,
      editableProduct,
      openAddModal,
      openEditModal,
      closeModal,
      saveProduct,
      deleteProduct,
    }
  },
}
</script>
