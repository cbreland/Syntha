<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Syntha
      Author: Christopher Breland
    Author Email: SeaBreez7890@gmail.com
========================================================================================== -->

<template>
  <div>
    <vs-sidebar
      position-right
      parent="body"
      default-index="1"
      color="dark"
      class="sidebarx"
      spacer
      v-model="sidebarState"
    >
      <div
        class="header-sidebar border border-gray-800 m-1 rounded-lg p-2 mb-10"
        slot="header"
      >
        <div v-if="this.authStatus === 'LogOut'" class="float-right">
          <div class="inline-flex p-2">
            <feather-icon icon="BellIcon" badge="2" />
          </div>
          <div class="inline-flex p-2">
            <feather-icon icon="MailIcon" badge="1" />
          </div>
        </div>
        <div class="float-right p-3 text-primary">
          {{ status }}
        </div>
        <vs-avatar size="70px" :src="avatarURL" />

        <h4>
          {{ displayName }}
        </h4>
        <div v-if="this.authStatus === 'LogOut'" class="text-xs ml-2">
          joined: {{ fmtDate() }}
        </div>
        <div v-else class="text-xs">Not Logged In</div>
      </div>

      <vs-sidebar-item @click="accountLink()" icon="home">
        Your Account (Home)
      </vs-sidebar-item>

      <div class="h-full mt-5"></div>

      <div class="footer-sidebar p-0" slot="footer">
        <div
          class="text-xs p-3 text-gray-700 text-right italic "
          v-if="accountNumber"
        >
          <div>User ID:</div>
          <div>{{ accountNumber }}</div>
        </div>
        <div
          v-if="this.authStatus === 'LogIn'"
          class="flex items-center justify-center"
        >
          <vs-button
            v-on:click="authStatusAction('signup')"
            icon="person_add"
            color="light"
            class=" bg-success "
            type="flat"
            >SignUp</vs-button
          >
          <vs-button
            v-on:click="authStatusAction('signin')"
            :icon="authStatusIcon"
            color="dark"
            type="flat"
            class=" bg-black2"
            >{{ authStatus }}</vs-button
          >
        </div>
        <div v-else>
          <vs-button
            v-on:click="authStatusAction()"
            :icon="authStatusIcon"
            color="dark"
            type="flat"
            class=" bg-black2"
            >{{ authStatus }}</vs-button
          >
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  name: 'cc-sidebar',
  props: {},

  data () {
    return {
      sidebarState: '',
      isVisible: false,
      status: '',
      displayName: '',
      avatarURL: '',
      emailVerified: '',
      authStatus: 'LogIn',
      authStatusAction: '',
      authStatusIcon: '',
      accountNumber: '',
      userProfileLink: '',
      bookmarkLink: '',
      historyLink: '',
      accountLink: ''
    }
  },
  computed: {
    watchSidebarState () {
      return this.$store.getters['auth/sidebarState']
    },
    watchStatus () {
      return this.$store.getters['auth/status']
    },
    watchAccountNumber () {
      return this.$store.getters['auth/accountNumber']
    },
    watchEmailVerified () {
      return this.$store.getters['auth/emailVerified']
    },
    watchAvatarURL () {
      return this.$store.getters['auth/photoURL']
    },
    watchDisplayName () {
      return this.$store.getters['auth/displayName']
    },
    watchAuthStatus () {
      return this.$store.getters['auth/authStatus']
    }
  },
  watch: {
    watchSidebarState (newValue) {
      this.sidebarState = newValue
    },
    watchStatus (newValue) {
      this.status = newValue
    },
    watchAccountNumber (newValue) {
      this.accountNumber = newValue
    },
    watchEmailVerified (newValue) {
      this.emailVerified = newValue
    },
    watchAvatarURL (newValue) {
      this.avatarURL = newValue
    },
    watchDisplayName (newValue) {
      this.displayName = newValue
    },
    watchAuthStatus (newValue) {
      if (newValue) {
        const l1 = this
        this.authStatus = 'LogOut'
        this.authStatusIcon = 'reply'

        this.authStatusAction = async function () {
          await this.$store.dispatch('auth/logout')

          //this.isVisible = false
          await this.$store.dispatch('auth/updateSidebarState', false)
        }

        this.userProfileLink = async function () {
          await l1.$router
            .push({ path: `/user/user-profile/${this.accountNumber}` })
            .catch(() => {})
        }
        this.bookmarkLink = function () {
          this.$router
            .push({ path: `/account/bookmarks/${this.accountNumber}` })
            .catch(() => {})
        }
        this.historyLink = function () {
          this.$router
            .push({ path: `/account/view-history/${this.accountNumber}` })
            .catch(() => {})
        }
        this.accountLink = async function () {
          await this.$store.dispatch('auth/updateSidebarState', false)
          this.$router
            .push({
              path: '/account/listings',
              query: { uid: this.accountNumber }
            })
            .catch(() => {})
        }
      } else {
        this.authStatus = 'LogIn'

        this.authStatusAction = async function (call) {
          if (call === 'signup') {
            await this.$store.dispatch('auth/updateSidebarState', false)
            await this.$store.dispatch('auth/updateAuthCardState', {
              type: 'signup',
              state: true
            })
          } else if (call === 'signin') {
            await this.$store.dispatch('auth/updateSidebarState', false)

            await this.$store.dispatch('auth/updateAuthCardState', {
              type: 'signin',
              state: true
            })
          }
        }
        this.authStatusIcon = 'input'

        this.userProfileLink = async function () {
          await this.$store.dispatch('auth/updateSidebarState', false)
        }
        this.bookmarkLink = async function () {
          await this.$store.dispatch('auth/updateSidebarState', false)
        }
        this.historyLink = async function () {
          await this.$store.dispatch('auth/updateSidebarState', false)
        }
        this.accountLink = async function () {
          await this.$store.dispatch('auth/updateSidebarState', false)
        }
      }
    }
  },

  created () {
    this.sidebarState = this.$store.getters['auth/sidebarState']
    const l1 = this

    this.$bus.$on('sidebarAction', data => {
      if (data === 'open') {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    })

    const authStatus = this.$store.getters['auth/authStatus']
    this.status = this.$store.getters['auth/status']
    this.accountNumber = this.$store.getters['auth/accountNumber']
    this.emailVerified = this.$store.getters['auth/emailVerified']
    this.avatarURL = this.$store.getters['auth/photoURL']
    this.displayName = this.$store.getters['auth/displayName']

    if (authStatus) {
      this.authStatus = 'LogOut'

      this.authStatusAction = async function () {
        await this.$store.dispatch('auth/logout')

        await this.$store.dispatch('auth/updateSidebarState', false)
      }

      this.authStatusIcon = 'reply'

      this.userProfileLink = function () {
        this.$router
          .push({ path: `/user/user-profile/${this.accountNumber}` })
          .catch(() => {})
      }
      this.bookmarkLink = function () {
        this.$router
          .push({ path: `/account/bookmarks/${this.accountNumber}` })
          .catch(() => {})
      }
      this.historyLink = function () {
        this.$router
          .push({ path: `/account/view-history/${this.accountNumber}` })
          .catch(() => {})
      }
      this.accountLink = async function () {
        await this.$store.dispatch('auth/updateSidebarState', false)
        this.$router
          .push({
            path: '/account/listings',
            query: { uid: this.accountNumber }
          })
          .catch(() => {})
      }
    } else {
      this.authStatus = 'LogIn'
      this.authStatusIcon = 'input'

      this.authStatusAction = async function (call) {
        if (call === 'signup') {
          await this.$store.dispatch('auth/updateSidebarState', false)

          await this.$store.dispatch('auth/updateAuthCardState', {
            type: 'signup',
            state: true
          })
        } else if (call === 'signin') {
          await this.$store.dispatch('auth/updateSidebarState', false)

          await this.$store.dispatch('auth/updateAuthCardState', {
            type: 'signin',
            state: true
          })
        }
      }

      this.userProfileLink = async function () {
        await l1.$store.dispatch('auth/updateSidebarState', false)
        await l1.$store.dispatch('auth/updateAuthCardState', {
          type: 'signup',
          state: true
        })
      }
      this.bookmarkLink = async function () {
        await l1.$store.dispatch('auth/updateSidebarState', false)
        await l1.$store.dispatch('auth/updateAuthCardState', {
          type: 'signup',
          state: true
        })
      }
      this.historyLink = async function () {
        await l1.$store.dispatch('auth/updateSidebarState', false)
        await l1.$store.dispatch('auth/updateAuthCardState', {
          type: 'signup',
          state: true
        })
      }
      this.accountLink = async function () {
        await l1.$store.dispatch('auth/updateSidebarState', false)
        await l1.$store.dispatch('auth/updateAuthCardState', {
          type: 'signup',
          state: true
        })
        localStorage.setItem('authPath', '/account')
      }
    }
  },

  mounted () {},
  methods: {
    fmtDate () {
      const dt = this.$store.getters['auth/dateJoined']

      const date = new Date(dt)
      const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year }
      ] = dateTimeFormat.formatToParts(date)

      return `${month}, ${day} ${year}`
    }
  },

  components: {}
}
</script>
