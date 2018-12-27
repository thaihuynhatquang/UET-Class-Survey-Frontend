<template>
  <v-card  class="delete-account">
    <v-layout row wrap justify-center>
      <v-icon color="mainColor" size=100>error_outline</v-icon>
    </v-layout>
    <v-layout row wrap justify-center>
      <h1 class="delete-account-content text-xs-center">Are you sure to delete<br>these accounts?</h1>
    </v-layout>
    <v-layout row wrap justify-center>
      <span class="delete-account-note">You will not be able to recover these accounts!</span>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-btn color="mainColor" class="delete-account-button" @click="closeDialog" dark>Cancel</v-btn>
      <v-btn color="mainColor" class="delete-account-button" @click="deleteAccount" dark>Delete</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    selected: Array
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    deleteAccount () {
      let listId = []
      this.selected.forEach((account) => {
        listId.push(account.id)
      })
      let data = {
        list_id: listId
      }
      this.$store.dispatch('admin/deleteMultiAccounts', data)
        .then(() => {
          this.closeDialog()
          let selected = []
          let snackbarMessage = 'Delete accounts successfully'
          let showSnackbar = true
          this.$emit('snackbarMessage', snackbarMessage)
          this.$emit('clearSelected', selected)
          this.$emit('showSnackbar', showSnackbar)
          this.$store.dispatch('admin/getAllAccounts')
          this.$store.dispatch('admin/getAllCourses')
          this.$store.dispatch('admin/checkStatusForm')
        })
    }
  }
}
</script>

<style scoped>
.delete-account {
  padding: 20px;
}
.delete-account-content {
  color: #43425D;
  margin: 10px;
}
.delete-account-note {
  color:  #43425D;
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
}
.delete-account-button {
  margin-left: 10px;
  text-transform: none !important;
  font-size: 15px;
}
</style>
