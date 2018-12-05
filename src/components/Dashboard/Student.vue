<template>
  <div>
    <v-app light id="app">
      <v-navigation-drawer id="backgroundImage" v-model="drawer" app dark>
        <v-content>
        </v-content>
      </v-navigation-drawer >
      <v-toolbar app :clipped-left="clipped">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title id="colorText"><strong>Course overview</strong></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <course-overview></course-overview>
    </v-app>
  </div>
</template>

<script>
import CourseOverview from './CourseOverview.vue'
export default {
  data () {
    return {
      clipped: false,
      drawer: true
      // items: [
      //   {
      //     action: 'local_activity',
      //     title: 'Attractions',
      //     path: '/',
      //     items: []
      //   },
      //   {
      //     action: 'restaurant',
      //     title: 'Breakfast',
      //     path: '/breakfast',
      //     items: []
      //   }
      // ]
    }
  },
  components: {
    courseOverview: CourseOverview
  }
}
</script>

<style scoped>
#app {
  background-color: #DBDBDB;
}
#backgroundImage {
  background-image: url('../../assets/Background.png');
  background-size: 100% 100%;
  background-position: top;
  background-attachment: fixed;
}
</style>
