import * as axios from 'axios'

export class AuthAxios {
  constructor () {
    this.baseURL = process.env.VUE_APP_API_URL
  }
  createInstance (idToken) {
    const baseURL = this.baseURL
    this.instance = axios.create({
      baseURL
    })
    this.instance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${idToken}`
  }
}
