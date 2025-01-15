<template>
  <div id="app">
    <nav class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <h1 class="text-2xl font-bold">Interactive Map</h1>
      </div>
    </nav>
    <div class="container mx-auto px-6 py-8 bg-white">
      <InteractiveMap />
    </div>
  </div>
</template>

<script>
import InteractiveMap from './views/InteractiveMap.vue'

export default {
  components: {
    InteractiveMap,
  },
}
</script>
