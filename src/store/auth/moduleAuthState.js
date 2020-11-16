/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

import * as firebase from 'firebase'

const userDefaults = {
  claims: {},
  creationTime: '',
  displayName: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: '',
  lastSignInTime: '',
  photoURL: 'https://lh3.googleusercontent.com/a/default-user=s140-p-k-rw-no',
  providerData: {},
  uid: '',
  about: '',
  status: 'offline',
  userRole: 'initial',
  refToken: '',
  idToken: '',
  idTokenResults: {}
}

const userSubscriptions = {
  account: 'base'
}

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {}

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getUserInfo = () => {
  const userInfo = {}

  // Update property in user
  Object.keys(userDefaults).forEach(key => {
    userInfo[key] = userInfoLocalStorage[key]
      ? userInfoLocalStorage[key]
      : userDefaults[key]
  })

  // Include properties from localStorage
  Object.keys(userInfoLocalStorage).forEach(key => {
    if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null) userInfo[key] = userInfoLocalStorage[key]
  })

  //commit('SET_BEARER', response.data.accessToken)
  return userInfo
}

const state = {
  authCardState: false,
  authCardType: 'signin', 
  sidebarState: false,
  AppActiveUser: getUserInfo(),
  refreshToken: '',
  subscriptions: userSubscriptions,
  isUserLoggedIn: () => {
    let isAuthenticated = false

    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser

    if (firebaseCurrentUser.isAuthenticated() || firebaseCurrentUser) isAuthenticated = true
    else isAuthenticated = false

    return localStorage.getItem('userInfo') && isAuthenticated
  }
}

export default state
