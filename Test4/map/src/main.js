import { createApp, provide, h } from 'vue'
import { ApolloClients } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import App from './App.vue'
import client from './apollo/apollo'
import './assets/index.css'
import 'leaflet/dist/leaflet.css'

const app = createApp({
  setup() {
    provide(ApolloClients, { default: client })
  },
  render: () => h(App),
})

const pinia = createPinia()
app.use(pinia)
app.mount('#app')
