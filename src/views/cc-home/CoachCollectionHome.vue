<template>
  <div class=" overflow-hidden">
    <div class="bg-transparent w-full fixed-top">
      <div class="flex items-center" v-once>
        <div
          class="flex-1 text-white text-center bg-black2 rounded-full shadow-lg py-1 m-2"
        >
          Quick Search
        </div>
      </div>
    </div>

    <div class="bg-black min-h-screen">
      <div class="block">
        <div class="pt-12 pb-2"></div>
        <div></div>
      </div>
    </div>

    <div class="bg-black pt-3 h-min-full"></div>
    <div class="bg-black flex items-center p-10 shadow-lg h-10" v-once>
      <div class="flex-1 text-center"></div>
    </div>
    <div
      class="bg-black2 flex items-center mx-3 mb-3 pt-2 shadow-lg rounded-full fixed-bottom  text-white h-10"
    >
      <div class="flex-1 text-center">
        <i v-on:click="openClose" class="material-icons mr-1">search</i>
      </div>
      <div class="flex-1 text-center">
        <i class="material-icons mr-1">add</i>
      </div>
      <div class="flex-1 text-center">
        <i class="material-icons mr-1">favorite</i>
      </div>
    </div>
    <pop-sidebar />
  </div>
</template>
<script>
import PopSidebar from './home-components/PopSidebar.vue'
 
export default {
  data: () => ({
    data: [],
    axios: '',
    idToken: '',
    img: '',
    img1: '',
    //logo: cclogo,
    type: 'flat',
    activeItem: 0,
    refreshKey: 1,
    photoURL: '',
    search: '',
    visible: false,
    cardType: 'signup'
  }),
  methods: {
    getPhotoURL () {},
    async openClose () {
      return await this.$store.dispatch('auth/updateSidebarState', true)
    },

    getInitialListings () {},
    scroll () {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.$baseAxios
            .get('/api-access/listings/get-listings/')
            .then(response => {
              this.data.push(response.data[0])
            })
        }
      }
    }
  },
  components: { PopSidebar },
  beforeMount () {},
  mounted () {}
}
</script>
