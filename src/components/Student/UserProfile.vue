<template>
  <v-layout id="layout-user-profile" align-center justify-center row fill-height>
    <v-flex xs12 sm11 md10 lg7 xl4>
      <v-card id="card-user-profile">
        <v-avatar class="mx-auto d-block" size="342">
          <img :src="avatar">
        </v-avatar>
        <v-card-text class="text-xs-center">
          <div id="user-role"><em>{{ role }}</em></div>
          <div id="user-name"><strong>{{ user.fullname }}</strong></div>
          <div id="user-grade">{{ user.classname }}</div>
          <div id="user-email">{{ user.vnuemail }}</div>
          <div id="user-courses"><strong>Total courses: {{ totalCourses }}</strong></div>
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
      user: state => state.user,
      avatar: state => state.avatar,
      role: state => state.role,
      totalCourses: state => state.student.totalCourses
    })
  }
}
</script>

<style scoped>
#layout-user-profile {
  margin: 20px;
}
#card-user-profile {
  padding-top: 50px;
  padding-bottom: 20px;
  padding-left: 60px;
  padding-right: 60px;
}
#user-role {
  margin: 12px;
  font-weight: semibold;
  color: #43425D;
  font-size: 30px;
}
#user-name {
  margin: 12px;
  font-weight: black;
  color: #43425D;
  font-size: 30px;
}
#user-grade {
  margin: 12px;
  font-weight: bold;
  color: #43425D;
  font-size: 25px;
}
#user-email {
  margin: 12px;
  color: #43425D;
  font-size: 25px;
}
#user-courses {
  margin: 12px;
  font-weight: semibold;
  color: #43425D;
  font-size: 25px;
}
</style>
