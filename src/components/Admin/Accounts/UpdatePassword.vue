<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Update Password</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="updatePassword">
          <v-layout wrap>
            <h2 class="text-xs-left align-left">Login Information of {{ userInfo.fullname }}</h2>
              <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="newPassword"
                  label="New Password"
                  v-model="newPassword"
                  hint="At least 6 characters"
                  :rules="[rules.required, rules.counterPassword]"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="confirmNewPassword"
                  label="Confirm Password"
                  v-model="confirmNewPassword"
                  :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :rules="[comparePasswords, rules.required]"
                  required>
                </v-text-field>
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
    userInfo: Object
  },
  data () {
    return {
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        counterPassword: value => value.length >= 6 || 'At least 6 characters'
      }
    }
  },
  computed: {
    comparePasswords () {
      return (this.newPassword !== this.confirmNewPassword && this.confirmNewPassword !== '')
        ? 'Password does not match'
        : true
    }
  },
  methods: {
    updatePassword () {
      let data = {
        id: this.userInfo.userId,
        password: this.newPassword
      }
      console.log(data)
      this.$store.dispatch('admin/updatePassword', data)
        .then(() => {
          let snackbarMessage = 'Update password successfully'
          let showSnackbar = true
          this.closeDialog()
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.$store.dispatch('admin/getAllAccounts')
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
