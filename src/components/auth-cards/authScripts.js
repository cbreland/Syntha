import * as firebase from 'firebase/app'

import 'firebase/auth'

const auth = {
  async processUserIn (
    instance,
    resultUser,
    firstName = '',
    lastName = '',
    signUp = false
  ) {
    const l1 = instance

    try {
      if (
        (resultUser.additionalUserInfo.isNewUser && !signUp) ||
        resultUser.additionalUserInfo.profile.family_name
      ) {
        firstName = resultUser.additionalUserInfo.profile.given_name
        lastName = resultUser.additionalUserInfo.profile.family_name
      }
    } catch (err) {
      firstName = resultUser.firstName
      lastName = resultUser.lastName
    }
    if (resultUser) {
      l1.user = await firebase.auth().currentUser
      const idToken = await l1.user.getIdTokenResult(true)

      if (idToken) {
        await l1.$AuthAxios.createInstance(idToken.token)

        if (firstName || lastName) {
          l1.user.firstName = firstName
          l1.user.lastName = lastName
        }

        const user = l1.user

        await l1.$store
          .dispatch('auth/updateUserData', { idToken, user })
          .catch(err => {
            console.log(err)
          })

        await l1.$vs.loading.close('#div-with-loading > .con-vs-loading')

        if (!signUp || !l1.user.emailVerified) {
          await l1.$store.dispatch('auth/updateAuthCardState', {
            type: 'signin',
            state: false
          })
          const displayName = l1.$store.getters['auth/displayName']
          l1.$vs.notify({
            time: 4000,
            title: `${displayName}, Welcome Back!`,
            text: '',
            color: 'dark',
            icon: 'favorite',
            position: 'top-left'
          })

          return true
        } else {
          return true
        }
      } else {
        return false
      }
    } else {
      await l1.$vs.loading.close('#div-with-loading > .con-vs-loading')

      if (!signUp && !l1.user.emailVerified) {
        await l1.$store.dispatch('auth/updateAuthCardState', {
          type: 'signin',
          state: false
        })
      }

      return true
    }
  },
  processUserOut: {}
}

export default auth
