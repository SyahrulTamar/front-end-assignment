<template>
  <div>
    <p v-if="!loading && !error" class="text-lg font-semibold text-gray-700">
      Total Distance: {{ Math.round(totalDistance) }} km
    </p>
    <div v-if="loading" class="text-blue-500">Loading locations...</div>
    <div v-if="error" class="text-red-500">Error: {{ error }}</div>
    <MapView v-if="!loading && !error && locations.length" :locations="locations" />
    <p v-if="!loading && !error && locations.length === 0" class="text-gray-500">
      No locations available.
    </p>
  </div>
</template>

<script>
import { useRouteStore } from '../stores/routeStore'
import { computed, onMounted } from 'vue'
import MapView from '../components/MapView.vue'

export default {
  components: {
    MapView,
  },
  setup() {
    const routeStore = useRouteStore()

    onMounted(() => {
      routeStore.fetchLocations()
    })

    return {
      locations: computed(() => routeStore.locations || []),
      loading: computed(() => routeStore.loading),
      error: computed(() => routeStore.error),
      totalDistance: computed(() => routeStore.totalDistance),
    }
  },
}
</script>
