/*=========================================================================================
  File Name: moduleAuthGetters.js
  Description: Auth Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

export default {
  activeUser: state => {
    return state.AppActiveUser
  },
  accountNumber: state => {
    return state.AppActiveUser.uid
  },
  emailVerified: state => {
    return state.AppActiveUser.emailVerified
  },
  userRole: state => {
    return state.AppActiveUser.userRole
  },
  photoURL: state => {
    return state.AppActiveUser.photoURL
  },
  email: state => {
    return state.AppActiveUser.email
  },
  displayName: state => {
    return state.AppActiveUser.displayName
  },
  status: state => {
    return state.AppActiveUser.status
  },
  dateJoined: state => {
    return state.AppActiveUser.creationTime
  },
  idToken: state => {
    return state.AppActiveUser.idToken
  },
  authStatus (state) {
    if (state.AppActiveUser.idToken) {
      return true
    } else {
      return false
    }
  },
  sidebarState: state => state.sidebarState,
  authCardState: state => {
    return { state: state.authCardState, type: state.authCardType }
  }
}
