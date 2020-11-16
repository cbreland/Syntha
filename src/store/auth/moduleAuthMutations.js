/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

export default {
  UPDATE_SIDEBAR_STATE (state, newState) {
    state.sidebarState = newState
  },
  UPDATE_AUTH_CARD_STATE (state, newState) {
    state.authCardState = newState.state
    state.authCardType = newState.type
  },

  LOGOUT (state) {
    this._vm.$acl.change('initial')

    state.AppActiveUser = {
      claims: {},
      creationTime: '',
      displayName: '',
      email: '',
      emailVerified: '',
      lastSignInTime: '',
      photoURL:
        'https://lh3.googleusercontent.com/a/default-user=s140-p-k-rw-no',
      providerData: {},
      uid: '',
      about: '',
      status: 'offline',
      userRole: 'initial',
      refToken: '',
      idToken: '',
      idTokenResults: {}
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('verifyEmailSent')
    localStorage.setItem('previousPath', '/logout')

    return true
  },
  SET_ID_TOKEN: (state, idToken) => (state.idToken = idToken),

  UPDATE_USER_INFO (state, payload) {
    const user = payload.cleanUser

    const idToken = payload.idToken.token

    const userRole = user.claims.user_permissions.role
    const sub = user.claims.user_permissions.sub

    // USER TOKEN UPDATES
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('accessToken', idToken)
    state.refreshToken = idToken

    // USER ROLE UPDATES
    const roleArray = []
    Object.keys(state.subscriptions).forEach(key => {
      if (sub[key] !== null) {
        state.subscriptions[key] = sub[key]
        roleArray.push(key)
      }
    })
    roleArray.push(userRole)
    this._vm.$acl.change(roleArray)

    // USER INFO UPDATES
    user.uid = payload.cleanUser.uid
    user.about = null
    user.status = 'Online'
    user.userRole = userRole
    user.refToken = idToken
    user.idToken = idToken
    user.idTokenResults = payload.idToken

    const localInfo = {}
    for (const property of Object.keys(user)) {
      if (user[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = user[property]

        // Update key in localStorage
        localInfo[property] = user[property]
      }
    }
    localStorage.setItem('verifyEmailSent', user.emailVerified)
    localStorage.setItem('userInfo', JSON.stringify(localInfo))

    return true
  }
}
