<template>
    <v-container fluid fill-height id="background">
      <v-toolbar app>
        <v-toolbar-title id="title" >
          <strong>{{ $store.state.route.name }}</strong></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :ripple="false" v-if="responsive" to="/student/dashboard">
          <v-icon color="#43425D">dashboard</v-icon>
        </v-btn>
        <v-btn icon :ripple="false" v-if="responsive" to="/student/profile">
          <v-icon color="#43425D">person</v-icon>
        </v-btn>
        <v-btn icon :ripple="false" v-if="responsive" to="/login">
          <v-icon color="#43425D">exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
      <appDrawer />
      <router-view></router-view>
      <app-footer/>
    </v-container>
</template>

<script>
import CourseOverview from './CourseOverview.vue'
import Drawer from './Drawer.vue'
import Footer from '../UI/Footer.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      responsive: false
    }
  },
  components: {
    courseOverview: CourseOverview,
    appDrawer: Drawer,
    appFooter: Footer
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
#background {
  background-color: #DBDBDB;
},
#title {
  color:  #43425D;
  font-size: 25px;
}
</style>
