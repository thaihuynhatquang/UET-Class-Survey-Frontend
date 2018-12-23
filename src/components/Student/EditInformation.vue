<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Edit Account</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="closeDialog">close</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="updatePassword">
          <v-layout wrap>
            <h2 class="text-xs-left align-left">Login Information</h2>
            <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="password"
                label="Password"
                v-model="password"
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
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                v-model="confirmPassword"
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
              <v-btn dark color="#43425D" type="submit">
                Update Password
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
        <form @submit.prevent="updateInformation">
          <v-layout wrap>
            <h2 class="text-xs-left align-left">User Information</h2>
             <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="fullname"
                label="Fullname"
                v-model="fullname"
                type="text"
                clearable
                :rules="[rules.required, rules.counterName]"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="vnuemail"
                label="VNU Email"
                v-model="vnuemail"
                hint="At least 6 characters"
                :rules="[rules.required, rules.isEmail]"
                type="text"
                clearable
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="classname"
                label="Class Name"
                v-model="classname"
                hint="At least 6 characters"
                :rules="[rules.required, rules.validClassname]"
                type="text"
                clearable
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex text-xs-center>
              <v-btn dark color="#43425D" type="submit">
                Update Information
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
      password: '',
      confirmPassword: '',
      fullname: this.userInfo.fullname,
      showPassword: false,
      showConfirmPassword: false,
      vnuemail: this.userInfo.vnuemail,
      classname: this.userInfo.classname,
      rules: {
        required: value => !!value || 'Required.',
        counterName: value => {
          if (value === undefined) return false
          else {
            return value.length >= 3 || 'At least 3 charecters'
          }
        },
        counterPassword: value => value.length >= 6 || 'At least 6 characters',
        isEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@vnu.edu.vn$/
          return pattern.test(value) || 'Email must be VNU mail. Ex: 16021113@vnu.edu.vn'
        },
        validClassname: value => {
          const pattern = /^QH-20[0-9]{2}-I\/CQ-[a-zA-Z-]+$/
          return pattern.test(value) || 'Example format: QH-2016-I/CQ-C-CLC'
        }
      }
    }
  },
  computed: {
    comparePasswords () {
      return (this.password !== this.confirmPassword && this.confirmPassword !== '')
        ? 'Password does not match'
        : true
    }
  },
  methods: {
    updateInformation () {
      let data = {
        fullname: this.fullname,
        vnuemail: this.vnuemail,
        classname: this.classname
      }
      this.$store.dispatch('student/editInformation', data)
        .then(() => {
          this.$store.dispatch('getUser')
          let snackbarMessage = 'Update Information successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.closeDialog()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updatePassword () {
      let data = {
        password: this.password
      }
      this.$store.dispatch('student/updatePassword', data)
        .then(() => {
          let snackbarMessage = 'Update Password successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.closeDialog()
        })
        .catch(err => {
          console.log(err.response)
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
