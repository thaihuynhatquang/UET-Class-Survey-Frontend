<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Update Password</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="updatePassword">
          <v-layout wrap>
            <h2 class="text-xs-left align-left">Login Information of Admin</h2>
              <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="newPassword"
                  label="New Password"
                  v-model="newPassword"
                  :rules="[counterPassword]"
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
                  :rules="[comparePasswords]"
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
          <v-layout v-if="message !== ''" row>
            <v-flex text-xs-center>
              <h3 style="color: #43425D"><em>{{message}}</em></h3>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      message: ''
    }
  },
  computed: {
    comparePasswords () {
      return (this.newPassword !== this.confirmNewPassword && this.confirmNewPassword !== '')
        ? 'Password does not match'
        : true
    },
    counterPassword () {
      return (this.newPassword.length < 6 && this.newPassword !== '') ? 'At least 6 characters' : true
    }
  },
  methods: {
    updatePassword () {
      let data = {
        password: this.newPassword
      }
      console.log(data)
      this.$store.dispatch('admin/updateAdminPassword', data)
        .then(() => {
          this.message = 'Update password successfully'
          this.newPassword = ''
          this.confirmNewPassword = ''
          setTimeout(() => {
            this.message = ''
            this.closeDialog()
          }, 2000)
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
