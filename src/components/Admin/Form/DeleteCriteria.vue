<template>
  <v-card  class="delete-criteria">
    <v-layout row wrap justify-center>
      <v-icon color="mainColor" size=100>error_outline</v-icon>
    </v-layout>
    <v-layout row wrap justify-center>
      <h1 class="delete-criteria-content text-xs-center">Are you sure to delete<br>this criteria?</h1>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-btn color="mainColor" class="delete-criteria-button" @click="closeDialog" dark>Cancel</v-btn>
      <v-btn color="mainColor" class="delete-criteria-button" @click="deleteCriteria" dark>Delete</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    criteria: Object
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    deleteCriteria () {
      let data = {
        id: this.criteria.id
      }
      this.$store.dispatch('admin/deleteCriteria', data)
        .then(() => {
          this.closeDialog()
          let snackbarMessage = 'Delete criteria successfully'
          let showSnackbar = true
          this.$emit('snackbarMessage', snackbarMessage)
          this.$emit('showSnackbar', showSnackbar)
          this.$store.dispatch('admin/getForm')
        })
    }
  }
}
</script>

<style scoped>
.delete-criteria {
  padding: 20px;
}
.delete-criteria-content {
  color: #43425D;
  margin: 10px;
}
.delete-criteria-note {
  color:  #43425D;
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
}
.delete-criteria-button {
  margin-left: 10px;
  text-transform: none !important;
  font-size: 15px;
}
</style>
