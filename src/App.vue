<template>
  <v-app>
    <v-content id="backgroundImage">
      <app-header></app-header>
      <transition name="flip" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/UI/Header.vue'

export default {
  components: {
    appHeader: Header
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

  .flip-enter {
      /*transform: rotateY(0deg);*/
  }

  .flip-enter-active {
      animation: flip-in  0.5s ease-out forwards;
  }

  .flip-leave {
      /*transform: rotateY(0deg);*/
  }

  .flip-leave-active {
      animation: flip-out 0.5s ease-out forwards;
  }

  @keyframes flip-out {
      from {
          transform: rotateY(0deg);
      }
      to {
          transform: rotateY(90deg);
      }
  }

  @keyframes flip-in {
      from {
          transform: rotateY(90deg);
      }
      to {
          transform: rotateY(0deg);
      }
  }
</style>
