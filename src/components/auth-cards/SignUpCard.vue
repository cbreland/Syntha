<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Syntha
      Author: Christopher Breland
    Author Email: SeaBreez7890@gmail.com
========================================================================================== -->

<template>
  <div v-if="authStatus">
    <div v-if="!emailNotVerified" class="bg-black mt-5">
      <div class="text-xl mb-10 font-bold ">
        OOPS! Your Email Has Not Been Verified.
      </div>

      <div @click="resendEmail()" class="pb-5 text-center mb-5 italic">
        <a
          class="font-bold text-sm text-yellow-600 hover:text-yellow-700"
          href="#"
        >
          Didn't Get the Email?
          <span class="block mt-3 text-center underline ml-3"
            >Send It Again</span
          >
        </a>
      </div>

      <vs-divider />
      <div
        class="font-bold text-sm my-16 text-yellow-600 hover:text-yellow-700"
        href="#"
      >
        Email Verified?
        <span class="ml-5"
          ><button
            @click="
              $store.dispatch('auth/updateAuthCardState', {
                state: true,
                type: 'signin'
              })
            "
            v-on:keyup.enter="
              $store.dispatch('auth/updateAuthCardState', {
                state: true,
                type: 'signin'
              })
            "
            class=" bg-primary mt-5 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Continue
          </button></span
        >
      </div>

      <div>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Syntha. All rights reserved.
        </p>
      </div>
    </div>
    <div v-else>
      <div>
        <div class="text-2xl mb-8 text-center font-bold ">
          Verification Email Sent !
        </div>

        <div @click="resendEmail()" class="pb-5 text-center mb-5 italic">
          <a
            class="font-bold text-sm text-yellow-600 hover:text-yellow-700"
            href="#"
          >
            Didn't Get It? <span class="underline ml-3">Send Again</span>
          </a>
        </div>

        <vs-divider />

        <div class="flex justify-center w-full mb-10">
          <button
            @click="afterVerify()"
            v-on:keyup.enter="afterVerify()"
            class=" flex bg-primary mt-5 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Continue
          </button>
        </div>

        <div>
          <p class="text-center text-gray-500 text-xs">
            &copy;2020 Syntha. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div>
      <div>
        <ValidationObserver ref="form">
          <form @submit.prevent="onSubmit">
            <div class="text-2xl mb-8 text-center font-bold ">
              Join The Collection
            </div>
            <div>
              <center>
                <div @click="signInWithGoogle()" id="gSignInWrapper">
                  <span class="label"></span>
                  <div id="customBtn" class="customGPlusSignIn">
                    <img
                      src="../../assets/images/logo/512px-Google__G__Logo.png"
                      class="p-2"
                      style="display: inline-block; vertical-align: middle; width: 42px; height: 42px;"
                    />
                    <span class="buttonText">Sign Up with Google</span>
                  </div>
                </div>
              </center>
            </div>
            <div>
              <div class="text-white text-center my-5">OR</div>
            </div>
            <div>
              <vs-alert
                class="no-scroll-content overflow-auto"
                title="Sign Up Error"
                :active="errorActive"
                color="danger"
              >
                {{ signupError }}
              </vs-alert>
            </div>
            <div>
              <!-- ///// EMAIL INPUT ///// -->
              <div class="text-right text-xs">
                Required Fields *
              </div>
              <div class="m-1">
                <ValidationProvider
                  name="Email"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label
                    class="block text-white text-sm font-bold mb-2"
                    for="Email"
                  >
                    Email <span class="text-xs">*</span>
                  </label>
                  <input
                    class=" bg-black2 shadow appearance-none  rounded w-full py-2 text-white leading-tight focus:shadow-outline"
                    id="email"
                    v-model="email"
                    type="text"
                    placeholder="email"
                  />
                  <div class="w-full text-danger text-sm">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>

              <!-- //// PASSWORD INPUT //// -->
              <div class="m-1">
                <ValidationProvider
                  name="Password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label
                    class="block text-white text-sm font-bold mb-2"
                    for="password"
                  >
                    Password <span class="text-xs">*</span>
                  </label>
                  <input
                    class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    v-model="password"
                    type="password"
                    placeholder="password"
                  />
                  <div class="w-full text-danger text-sm">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div>
              <!-- //// FIRST NAME INPUT //// -->
              <div class="m-1">
                <ValidationProvider
                  name="First Name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class=" text-white text-sm font-bold mb-2" for="Email">
                    First Name <span class="text-xs">*</span>
                  </label>
                  <input
                    class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:shadow-outline"
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    placeholder="first name"
                  />
                  <div class="w-full text-danger text-sm">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>

              <!-- //// LAST NAME INPUT //// -->
              <div class="m-1">
                <ValidationProvider
                  name="Last Name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label
                    class="flex text-white text-sm font-bold mb-2"
                    for="password"
                  >
                    Last Name <span class="text-xs">*</span>
                  </label>
                  <input
                    class=" bg-black2 shadow appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    placeholder="last name"
                  />
                  <div class="w-full text-danger text-sm">
                    {{ errors[0] }}
                  </div>

                  <!-- <span class="w-1/2 text-danger">{{ errors[0] }}</span> -->
                </ValidationProvider>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <button
                id="div-with-loading"
                @click="onSubmit()"
                v-on:keyup.enter="onSubmit()"
                class="vs-con-loading__container bg-primary mt-5 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
            </div>

            <div class="mt-10">
              <vs-divider />
            </div>
            <div>
              <div
                @click="
                  $store.dispatch('auth/updateAuthCardState', {
                    state: true,
                    type: 'signin'
                  })
                "
                class="pb-5"
              >
                <a
                  class="font-bold text-sm text-yellow-600 hover:text-yellow-700"
                  href="#"
                >
                  Already Have an Account?
                  <span class="underline">LOG IN</span>
                </a>
              </div>
              <div>
                <p class="text-center text-gray-500 text-xs">
                  &copy;2020 Syntha. All rights reserved.
                </p>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'

export default {
  computed: {
    watchEmailVerified () {
      return this.$store.getters['auth/emailVerified']
    },
    watchAuthStatus () {
      return this.$store.getters['auth/authStatus']
    }
  },
  watch: {
    watchEmailVerified (newValue) {
      this.emailVerified = newValue
    },
    watchAuthStatus (newValue) {
      this.authStatus = newValue
    }
  },

  created () {
    return this.$store.getters['auth/emailVerified']
  },
  data () {
    return {
      errorActive: false,
      signupError: '',
      firstName: '',
      lastName: '',
      password: '',
      emailVerified: false,
      emailNotVerified: true,
      authStatus: false,
      email: ''
    }
  },
  mounted () {},
  methods: {
    openLoadingInDiv () {
      this.$vs.loading({
        background: 'dark',
        color: this.colorLoading,
        container: '#div-with-loading',
        scale: 0.45
      })
    },
    async afterVerify () {
      const result = await firebase.auth().currentUser

      const l1 = this

      await this.$auth
        .processUserIn(this, await result, '', '', true)
        .then(verifyRes => {
          if (!verifyRes) {
            l1.emailNotVerified = false
          }
        })
        .catch(err => { console.log(err) })
    },
    resendEmail () {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function () {
          // Email sent.
          console.log('Email Sent')
        })
        .catch(function (error) {
          // An error happened.
          console.log(error)
        })
    },

    signInWithGoogle () {
      const l1 = this
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async result => {
          const token = result.credential.accessToken
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          }
          await l1.$baseAxios
            .get(
              'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
              config
            )
            .then(res => {
              l1.firstName = res.data.given_name
              l1.lastName = res.data.family_name
            })
            .catch(err => { console.log(err) })

          await this.$auth
            .processUserIn(l1, await result, l1.firstName, l1.lastName, false)
            .catch(err => { console.log(err) })
        })
        .catch(function (error) {
          // Handle Errors here.
          l1.errorActive = true
          l1.loginError = error.message
          // ...
        })
    },
    onSubmit () {
      this.openLoadingInDiv()
      const l1 = this
      this.$refs.form.validate().then(success => {
        localStorage.setItem('userEmail', this.email)

        if (success) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(l1.email, l1.password)
            .then(async result => {
              await this.$auth.processUserIn(
                l1,
                await result,
                l1.firstName,
                l1.lastName,
                true
              )
              l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
              const currentUser = await firebase.auth().currentUser

              await currentUser.sendEmailVerification()

              await currentUser
                .updateProfile({
                  displayName: `${l1.firstName} ${l1.lastName}`
                })
                .catch(err => {
                  l1.errorActive = true
                  l1.signupError = err
                })
            })
            .catch(function (error) {
              l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
              // Handle Errors here.
              console.log(error.code)
              l1.signupError = error.message
              l1.errorActive = true
              // ...
            })
        } else {
          l1.$vs.loading.close('#div-with-loading > .con-vs-loading')
        }
      })
    }
  },
  components: {}
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
