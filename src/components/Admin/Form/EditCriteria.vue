<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Edit Criteria</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="onEditCriteria">
          <v-layout wrap>
            <v-flex xs11>
              <v-textarea
                color="#43425D"
                name="criteriaName"
                label="Criteria"
                v-model="text"
                outline
                clearable
                :rules="[rules.required]"
                required>
              </v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex text-xs-center>
              <v-btn dark color="#43425D" @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn dark color="#43425D" type="submit">
                Save
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    criteria: Object
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.'
      },
      text: this.criteria.criteria
    }
  },
  methods: {
    onEditCriteria () {
      let data = {
        criteria: this.text,
        id: this.criteria.id
      }
      console.log(data)
      this.$store.dispatch('admin/editCriteria', data)
        .then(() => {
          let snackbarMessage = 'Update criteria successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.$store.dispatch('admin/getForm')
          this.closeDialog()
        })
    },
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    }
  }
}
</script>

<style scoped>
.align-left {
  margin-left: -15px;
  font-size: 15px;
  color:#43425D;
}
</style>
