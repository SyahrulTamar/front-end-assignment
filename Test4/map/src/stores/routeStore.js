import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_LOCATIONS } from '../graphql/queries'
import { watch } from 'vue'
import { calculateDistance } from '../utils/calculateDistance'

export const useRouteStore = defineStore('route', {
  state: () => ({
    locations: [],
    loading: false,
    error: null,
    totalDistance: 0,
  }),
  actions: {
    async fetchLocations() {
      this.loading = true
      this.error = null

      try {
        const { result } = useQuery(GET_ALL_LOCATIONS)

        watch(result, (response) => {
          if (response && response.locations) {
            this.locations = response.locations
            // Hitungan total jarak berdasarkan lokasi
            const route = {
              points: this.locations.map((loc) => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              })),
              sub_routes: [],
            }
            this.totalDistance = calculateDistance(route)
          } else {
            this.locations = []
            this.totalDistance = 0
          }
        })
      } catch (err) {
        console.error('GraphQL Error:', err.message)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
