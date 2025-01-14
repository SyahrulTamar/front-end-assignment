<template>
  <div id="app">
    <nav class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" class="text-3xl font-bold logo-font tracking-wide hover:opacity-90">
          Toko Tokoan
        </a>
      </div>
    </nav>
    <div class="container mx-auto mt-10 px-6 py-8 bg-white">
      <CategoryList />
      <ProductsList />
    </div>
  </div>
</template>

<script>
import CategoryList from './components/CategoryList.vue'
import ProductsList from './components/ProductsList.vue'

export default {
  components: {
    CategoryList,
    ProductsList,
  },
}
</script>
