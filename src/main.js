/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './routes'
import {account} from './services/appwrite'

const app = createApp(App)

registerPlugins(app)

account.get().then(account => {
  store.commit('setAccount', account)
})
.catch(err => {
  console.log(err.message)
})
.finally(() => {
  app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')
})

