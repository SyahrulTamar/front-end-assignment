import { gql } from '@apollo/client/core'

// Query: Ambil semua data
export const GET_ALL_DATA = gql`
  query GetAllData {
    categories {
      id
      name
      parent_id
    }
    products {
      id
      name
      price
      quantity
      category_id
    }
  }
`

// Mutasi: Tambah produk
export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: numeric!, $quantity: Int!, $category_id: Int) {
    insert_products_one(
      object: { name: $name, price: $price, quantity: $quantity, category_id: $category_id }
    ) {
      id
      name
      price
      quantity
      category_id
    }
  }
`

// Mutasi: Update produk
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String!
    $price: numeric!
    $quantity: Int!
    $category_id: Int
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, price: $price, quantity: $quantity, category_id: $category_id }
    ) {
      id
      name
      price
      quantity
      category_id
    }
  }
`

// Mutasi: Hapus produk
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`
