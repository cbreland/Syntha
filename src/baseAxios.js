import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'

const baseAxios = function () {
  const baseURL = process.env.VUE_APP_API_URL
  const axiosInstance = axios.create({
    baseURL
  })
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('idToken')}`
  Vue.prototype.$baseAxios = axiosInstance
  Vuex.Store.prototype.$baseAxios = axiosInstance
}

export default baseAxios
