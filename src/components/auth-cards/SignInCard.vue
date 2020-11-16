<template>
  <div>
    <form v-if="!passwordReset">
      <div>
        <div class="text-2xl text-white mb-10 font-bold ">
          Sign In
        </div>

        <div>
          <vs-alert
            class="no-scroll-content overflow-auto"
            title="Login Error"
            :active="errorActive"
            color="danger"
          >
            {{ loginError }}
          </vs-alert>
        </div>
        <div class="my-4">
          <label class="block text-white text-sm font-bold mb-2" for="Email">
            Email
          </label>
          <input
            class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:shadow-outline"
            id="username"
            v-model="email"
            type="text"
            placeholder="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-white text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            v-model="password"
            type="password"
            placeholder="password"
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            id="div-with-loading"
            @click="loginWithPassword()"
            v-on:keyup.enter="loginWithPassword()"
            class=" vs-con-loading__container bg-primary hover:bg-yellow-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <div
            v-on:click="openPasswordReset"
            class="inline-block align-baseline font-bold text-sm text-yellow-600 hover:text-yellow-700"
          >
            Forgot Password?
          </div>
        </div>

        <div>
          <center>
            <div class="text-white text-center my-2">OR</div>
            <div @click="signInWithGoogle()" id="gSignInWrapper">
              <span class="label"></span>
              <div id="customBtn" class="customGPlusSignIn">
                <img
                  src="../../assets/images/logo/512px-Google__G__Logo.png"
                  class="p-2"
                  style="display: inline-block; vertical-align: middle; width: 42px; height: 42px;"
                />
                <span class="buttonText">Sign in with Google</span>
              </div>
            </div>
          </center>
        </div>

        <div class="mt-2">
          <vs-divider />
        </div>
        <div>
          <div class="text-center">
            <div v-on:click="signUp()" v-on:keyup.enter="signUp()" class="py-2">
              <a
                class="font-bold text-sm text-yellow-600 hover:text-yellow-700"
                href="#"
              >
                Need an account? <span class="underline">SIGN UP</span>
              </a>
            </div>
            <div>
              <p class="text-center text-gray-500 text-xs">
                &copy;2020 Syntha. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <form v-else>
      <div>
        <div class="text-2xl text-white mb-10 font-bold ">
          Password Reset
        </div>

        <div>
          <vs-alert
            class="no-scroll-content overflow-auto"
            title="Login Error"
            :active="errorActive"
            color="danger"
          >
            {{ loginError }}
          </vs-alert>
        </div>
        <div class="my-4">
          <label class="block text-white text-sm font-bold mb-2" for="Email">
            Email
          </label>
          <input
            class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:shadow-outline"
            id="username"
            v-model="email"
            type="text"
            placeholder="email"
          />
        </div>

        <div class="flex justify-center w-full">
          <button
            id="div-with-loading"
            @click="forgotPassword()"
            v-on:keyup.enter="forgotPassword()"
            class=" my-12 vs-con-loading__container bg-primary hover:bg-yellow-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {{ resetEmail }}
          </button>
        </div>

        <div class="mt-2">
          <vs-divider />
        </div>

        <div>
          <div class="text-center mt-16">
            <div v-on:click="passwordReset = false">
              <a
                class="font-bold text-sm text-yellow-600 hover:text-yellow-700"
                href="#"
              >
                <span class="underline">Back To Login Screen</span>
              </a>
            </div>
            <div>
              <p class="text-center text-gray-500 text-xs mt-16">
                &copy;2020 Syntha. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'

export default {
  props: { clicked: { type: Boolean, default: false } },
  data () {
    return {
      errorActive: false,
      loginError: '',
      password: '',
      email: '',
      resetEmail: 'Send Reset Email',
      passwordReset: false
    }
  },
  mounted () {},
  methods: {
    openPasswordReset () {
      this.passwordReset = true
    },
    openLoadingInDiv () {
      this.$vs.loading({
        background: 'dark',
        color: this.colorLoading,
        container: '#div-with-loading',
        scale: 0.45
      })
    },
    signInWithGoogle () {
      const l1 = this
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async result => {
          await this.$auth.processUserIn(l1, await result)

          if (localStorage.getItem('authPath')) {
            this.$router.push(localStorage.getItem('authPath')).catch(() => {})
            localStorage.removeItem('authPath')
          }
        })
        .catch(function (error) {
          localStorage.removeItem('authPath')
          // Handle Errors here.
          l1.errorActive = true
          l1.loginError = error.message
          // ...
        })
    },
    loginWithPassword () {
      this.openLoadingInDiv()
      const l1 = this
      return firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async result => {
          await this.$auth.processUserIn(l1, await result)
          l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
          if (localStorage.getItem('authPath')) {
            this.$router.push(localStorage.getItem('authPath')).catch(() => {})
            localStorage.removeItem('authPath')
          }
        })
        .catch(function (error) {
          localStorage.removeItem('authPath')
          l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
          // Handle Errors here.
          l1.errorActive = true
          l1.loginError = error.message
          // ...
        })
    },
    forgotPassword () {
      this.openLoadingInDiv()
      this.passwordReset = true
      this.errorActive = false
      const l1 = this
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function () {
          l1.resetEmail = 'Resend Email'
          l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
        })
        .catch(function (error) {
          l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
          // Handle Errors here.
       
          l1.errorActive = true
          l1.loginError = error.message
        })
    },
    async signUp () {
      await this.$store.dispatch('auth/updateAuthCardState', {
        type: 'signup',
        state: true
      })
    },
    components: {}
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  white-space: nowrap;
}
#customBtn:hover {
  cursor: pointer;
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background-image: url("~../../assets/images/logo/512px-Google__G__Logo.png");
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: "Roboto", sans-serif;
}
</style>
