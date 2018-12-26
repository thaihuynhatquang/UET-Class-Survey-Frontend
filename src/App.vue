<template>
  <v-app>
    <v-content>
      <v-img :src="image" height="100%">
        <app-header v-if="['Login'].indexOf($route.name) > -1" />
        <router-view></router-view>
      </v-img>
    <v-snackbar
      top
      v-model="snackbar.value"
      :color="snackbar.colorSnackbar"
      :timeout="snackbar.snackbarTimeout"
    >
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
    </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Header from './components/UI/Header.vue'

export default {
  data () {
    return {
      snackbar: {
        value: false,
        snackbarMessage: 'Your session is end',
        snackbarTimeout: 3000,
        colorSnackbar: 'white'
      }
    }
  },
  name: 'App',
  components: {
    appHeader: Header
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
  created () {
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.response.data.message === 'jwt expired') {
          // eslint-disable-next-line
          this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
              this.snackbar.value = true
            })
        }
        throw err
      })
    })
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

<style scoped>
#backgroundImage {
    background-image: url('./assets/Background.png');
    background-size: 100% 100%;
    background-position: top;
    background-attachment: fixed;
  }
</style>
