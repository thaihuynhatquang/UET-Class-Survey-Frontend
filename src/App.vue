<template>
  <v-app>
    <v-content>
      <v-img :src="image" height="100%">
        <app-header v-if="['Login'].indexOf($route.name) > -1"></app-header>
          <router-view></router-view>
        <app-footer></app-footer>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Header from './components/UI/Header.vue'
import Footer from './components/UI/Footer.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  computed: {
    ...mapState('app', ['image']),
    drawer: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style>
#backgroundImage {
    background-image: url('./assets/Background.png');
    background-size: 100% 100%;
    background-position: top;
    background-attachment: fixed;
  }
</style>
