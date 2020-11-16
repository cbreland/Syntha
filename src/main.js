/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

// Access Control

import acl from './acl/acl'

// import vuex
import Vuex from 'vuex'

// Filters
import './filters/filters.js'

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather font icon
require('./assets/css/iconfont.css')

import baseAxios from './baseAxios'
baseAxios()

import { AuthAxios } from './axios'
const Axios = new AuthAxios()
Vue.prototype.$AuthAxios = Axios
Vuex.Store.prototype.$AuthAxios = Axios

const bus = new Vue()
Vue.prototype.$bus = bus
Vuex.Store.prototype.$bus = bus

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
  router,
  acl,
  store,
  render: h => h(App)
}).$mount('#app')
