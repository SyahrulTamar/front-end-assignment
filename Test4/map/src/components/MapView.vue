<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'

export default {
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const map = L.map('map').setView([-2.5, 117.5], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)

    this.locations.forEach((location) => {
      L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(`<b>${location.name}</b>`)
    })
  },
}
</script>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
