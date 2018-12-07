<template>
  <v-layout id="layout" align-center justify-center row fill-height>
    <v-flex xs12 sm11 md10 lg7 xl4>
      <v-card id="card">
        <v-avatar class="mx-auto d-block" size="342">
          <img :src="avatar">
        </v-avatar>
        <v-card-text class="text-xs-center">
          <div id="role"><em>{{ role }}</em></div>
          <div id="name"><strong>{{ user.fullname }}</strong></div>
          <div id="grade">{{ user.classname }}</div>
          <div id="email">{{ user.vnuemail }}</div>
          <div id="courses"><strong>Total courses: 6</strong></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      user: state => state.user,
      avatar: state => state.avatar,
      role: state => state.role
    })
  }
}
</script>

<style scoped>
#layout {
  margin: 20px;
}
#card {
  border-radius: 20px;
  padding-top: 50px;
  padding-bottom: 20px;
  padding-left: 60px;
  padding-right: 60px;
}
#role {
  margin: 12px;
  font-weight: semibold;
  color: #43425D;
  font-size: 30px;
}
#name {
  margin: 12px;
  font-weight: black;
  color: #43425D;
  font-size: 30px;
}
#grade {
  margin: 12px;
  font-weight: bold;
  color: #43425D;
  font-size: 25px;
}
#email {
  margin: 12px;
  color: #43425D;
  font-size: 25px;
}
#courses {
  margin: 12px;
  font-weight: semibold;
  color: #43425D;
  font-size: 25px;
}
.rounded-button{
  border-radius: 15px;
}
</style>
