<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Category List</h1>
    <div v-if="loading" class="text-center text-lg text-blue-500">Loading...</div>
    <div v-if="error" class="text-center text-lg text-red-500">
      Error loading categories: {{ error }}
    </div>
    <div class="container mx-auto p-4">
      <div
        v-if="categories && categories.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-white shadow-md rounded-lg overflow-hidden border"
        >
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800">{{ category.name }}</h2>
            <p class="text-gray-500 mt-2">
              Total Price: <span class="font-medium">Rp {{ calculateTotal(category.id) }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No categories available</div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import { computed, onMounted } from 'vue'
import { calculateCategoryTotal } from '../utils/calculateTotal'

export default {
  setup() {
    const productStore = useProductStore()

    // Fungsi kalkulasi untuk total harga kategori
    const calculateTotal = (categoryId) => {
      return calculateCategoryTotal(categoryId, productStore.categories, productStore.products)
    }

    // Fetch data 
    onMounted(() => {
      console.log('Fetching categories...')
      productStore.fetchAllData()
    })

    return {
      categories: computed(() => productStore.categories),
      loading: computed(() => productStore.loading),
      error: computed(() => productStore.error),
      calculateTotal,
    }
  },
}
</script>
