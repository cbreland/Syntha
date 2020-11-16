<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Syntha
      Author: Christopher Breland
    Author Email: SeaBreez7890@gmail.com
========================================================================================== -->

<template>
  <div v-if="isVisible" class="modal-mask">
    <div>
      <div
        v-on:click.self="cardDeactivate()"
        class="  bg-black flex justify-center bg-opacity-75 items-center h-screen"
      >
        <div
          class="bg-black border relative border-gray-700 max-w-xs rounded-lg px-8 py-3"
        >
          <div
            v-on:click="cardDeactivate()"
            class="absolute top-0 right-0 rounded-full border border-gray-700 bg-black"
            style="cursor: pointer; margin-top: -8px; margin-right: -8px"
          >
            <i class="flex p-2 material-icons">close</i>
          </div>

          <sign-in-card v-if="cardType === 'signin'" />
          <sign-up-card
            :catchUnverified="catchUnverified()"
            v-else-if="cardType === 'signup'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInCard from './SignInCard'
import SignUpCard from './SignUpCard'

export default {
  name: 'cc-auth',
  computed: {
    watchAuthCardState () {
      return this.$store.getters['auth/authCardState']
    }
  },
  watch: {
    watchAuthCardState (newValue) {
      this.cardType = newValue.type
      this.isVisible = newValue.state
    }
  },

  created () {
    return this.$store.getters['auth/authCardState']
  },
  data () {
    return {
      cardType: 'signin',
      isVisible: false
    }
  },

  mounted () {},

  methods: {
    cardDeactivate () {
      this.$store.dispatch('auth/updateAuthCardState', {
        type: 'signin',
        state: false
      })
      this.$store.dispatch('auth/updateSidebarState', false)
    },
    catchUnverified () {
      return JSON.parse(localStorage.getItem('catchUnverified'))
    }
  },
  components: { SignInCard, SignUpCard }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  overflow: hidden;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
</style>
