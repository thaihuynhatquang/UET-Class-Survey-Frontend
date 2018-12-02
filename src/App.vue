<template>
  <v-app>
    <v-content id="backgroundImage">
      <app-header v-if="['Login'].indexOf($route.name) > -1"></app-header>
        <router-view></router-view>
      <app-footer></app-footer>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/UI/Header.vue'
import Footer from './components/UI/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  name: 'App'
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
