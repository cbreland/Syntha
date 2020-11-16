/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import mapUserUpdate from '../../../functions/src/authorization-on-create'

export default {
  updateSidebarState ({ commit }, newState) {
    commit('UPDATE_SIDEBAR_STATE', newState)
  },
  updateAuthCardState ({ commit }, newState) {
    commit('UPDATE_AUTH_CARD_STATE', newState)
  },

  updateUserData ({ commit }, payload) {
    const firstName = payload.user.firstName
    const lastName = payload.user.lastName
    this.co = commit

    const idToken = payload.idToken

    if (idToken.token) {
      console.log(payload.user.uid, firstName, lastName)

      return this._vm.$AuthAxios.instance
        .get('/api-access/auth/user-info/', {
          params: {
            uid: payload.user.uid,
            firstName,
            lastName
          }
        })
        .then(res => {
          const cleanUser = mapUserUpdate(res.data.claims.acl, payload.user)

          cleanUser.firstName = res.data.firstName
          cleanUser.lastName = res.data.lastName
          cleanUser.uid = payload.user.uid

          this.co('auth/UPDATE_USER_INFO', {
            cleanUser,
            idToken
          })
        })

        .catch(error => {
          throw error
        })
    }

    return false
  },

  logout ({ commit }) {
    const firebaseCurrentUser = firebase.auth().currentUser

    commit('auth/LOGOUT')
    if (firebaseCurrentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          return true
        })
    } else {
      return false
    }
  },

  clearUserCache ({ commit }) {
    commit('auth/LOGOUT')
  },

  updateRefreshToken ({ commit }, refToken) {
    commit('auth/UPDATE_REFRESH_TOKEN', refToken)
  },

  updateUserRole ({ commit }, acl) {
    const userRole = acl.userRole
    let newUserRole = 'admin'
    this.co = commit

    const firebaseCurrentUser = firebase.auth().currentUser

    if (firebaseCurrentUser) {
      if (acl.uid === 'Qu7sjhzB6HdgXqHul1PyvhDhveo2') {
        newUserRole = userRole
      } else {
        newUserRole = userRole
      }

      this.co('auth/UPDATE_USER_INFO', {
        payload: { userRole: newUserRole },
        aclChangeRole: acl.aclChangeRole
      })

      //
    }
  }
}
