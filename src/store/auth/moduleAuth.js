/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/

import state from './moduleAuthState'
import mutations from './moduleAuthMutations.js'
import actions from './moduleAuthActions.js'
import getters from './moduleAuthGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
