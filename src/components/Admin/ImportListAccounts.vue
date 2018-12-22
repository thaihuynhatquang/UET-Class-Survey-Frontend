<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Role of list accounts?</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-flex xs11>
        <span style="color: #43425D;">Note: Must have column "classname" for Student account</span>
      </v-flex>
      <v-flex xs11>
        <v-radio-group v-model="role" row>
          <v-radio label="Lecturer" value="2" color="#43425D"></v-radio>
          <v-radio label="Student" value="3" color="#43425D"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs11 v-if="message !== ''">
        <span style="color: #43425D;"><em>Error: {{ message }}. Try again!</em></span>
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="mainColor"
        @click="closeDialog"
        :disabled="loadingButtonIcon"
      >
        <div class="text-button-survey">Cancel</div>
      </v-btn>
      <v-btn
        color="mainColor"
        @click="$refs.importListAccounts.click()"
        :loading="loadingButtonIcon"
        :disabled="loadingButtonIcon"
        >
          <div class="text-button-survey">Select File</div>
          <v-icon right color="white">cloud_upload</v-icon>
        </v-btn>
      <input hidden type="file" multiple="false" accept="*.xlsx | *.xls" ref="importListAccounts" @change="importListAccounts">
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data () {
    return {
      role: '2',
      listAccounts: '',
      message: '',
      loadingButtonIcon: false
    }
  },
  methods: {
    importListAccounts () {
      this.loadingButtonIcon = true
      this.listAccounts = this.$refs.importListAccounts.files[0]
      let formData = new FormData()
      formData.append('role', this.role)
      formData.append('file', this.listAccounts)
      this.$store.dispatch('admin/importListAccounts', formData)
        .then(() => {
          let snackbarMessage = 'Import list accounts successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.$store.dispatch('admin/getAllAccounts')
          this.loadingButtonIcon = false
          this.closeDialog()
        })
        .catch((err) => {
          this.loadingButtonIcon = false
          this.$refs.importListAccounts.value = ''
          this.message = err.response.data.message
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
.text-button-survey {
  color: white;
}
</style>
