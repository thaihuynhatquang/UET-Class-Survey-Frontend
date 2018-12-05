<template>
  <v-footer v-if="['Login'].indexOf($route.name) > -1" app clipped-left=false dark color="#43425D" class="pa-3 elevation-24" height="40px">
    <v-spacer></v-spacer>
    <!-- eslint-disable-next-line -->
    <div>&copy<strong> 2018 QBD Team</strong></div>
  </v-footer>
  <v-footer  v-else app clipped-left=false inset light class="pa-3 elevation-24" height="40px">
    <v-spacer></v-spacer>
    <!-- eslint-disable-next-line -->
    <div id="colorText">&copy<strong> 2018 QBD Team</strong></div>
  </v-footer>
</template>

<style>
#colorText {
  color:  #43425D;
}
</style>
