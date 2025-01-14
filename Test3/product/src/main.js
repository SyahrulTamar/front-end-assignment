import { createApp, provide, h } from 'vue'
import { ApolloClients } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import App from './App.vue'
import client from './apollo/apollo'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import './assets/index.css'

const app = createApp({
  setup() {
    provide(ApolloClients, { default: client })
  },
  render: () => h(App),
})

const pinia = createPinia()
app.use(pinia)

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' },
  ripple: true,
})

app.config.globalProperties.$notyf = notyf

app.mount('#app')
