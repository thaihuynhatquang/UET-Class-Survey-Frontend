<template>
  <v-card  class="delete-course">
    <v-layout row wrap justify-center>
      <v-icon color="mainColor" size=100>error_outline</v-icon>
    </v-layout>
    <v-layout row wrap justify-center>
      <h1 class="delete-course-content text-xs-center">Are you sure to delete<br>all courses?</h1>
    </v-layout>
    <v-layout row wrap justify-center>
      <span class="delete-course-note">You will not be able to recover these courses!</span>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-btn color="mainColor" class="delete-course-button" @click="closeDialog" dark>Cancel</v-btn>
      <v-btn color="mainColor" class="delete-course-button" @click="deleteCourse" dark>Delete</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    deleteCourse () {
      this.$store.dispatch('admin/deleteAllCourses')
        .then(() => {
          this.closeDialog()
          let snackbarMessage = 'Delete all courses success'
          let showSnackbar = true
          this.$emit('snackbarMessage', snackbarMessage)
          this.$emit('showSnackbar', showSnackbar)
          this.$store.dispatch('admin/getAllCourses')
        })
    }
  }
}
</script>

<style scoped>
.delete-course {
  padding: 20px;
}
.delete-course-content {
  color: #43425D;
  margin: 10px;
}
.delete-course-note {
  color:  #43425D;
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
}
.delete-course-button {
  margin-left: 10px;
  text-transform: none !important;
  font-size: 15px;
}
</style>
