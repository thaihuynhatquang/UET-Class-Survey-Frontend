<template>
    <v-app id="app">
      <v-toolbar app prominent>
        <v-toolbar-title id="colorText"><strong>{{ $store.state.route.name }}</strong></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <appDrawer />
      <router-view></router-view>
    </v-app>
</template>

<script>
import CourseOverview from './CourseOverview.vue'
import Drawer from './Drawer.vue'

export default {
  components: {
    courseOverview: CourseOverview,
    appDrawer: Drawer
  }
}
</script>

<style scoped>
#app {
  background-color: #DBDBDB;
}
</style>
