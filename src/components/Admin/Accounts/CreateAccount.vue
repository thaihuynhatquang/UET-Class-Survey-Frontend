<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>New Account</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="createAccount">
          <v-layout wrap>
          <h2 class="text-xs-left align-left">User Information</h2>
              <v-flex xs11>
                <v-radio-group v-model="role" row>
                  <v-radio label="Lecturer" value="2" color="#43425D"></v-radio>
                  <v-radio label="Student" value="3" color="#43425D"></v-radio>
                </v-radio-group>
              </v-flex>
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
              <v-flex xs11 v-if="role == 3">
                <v-text-field
                  color="#43425D"
                  name="classname"
                  label="Class Name"
                  id="classname"
                  v-model="classname"
                  hint="At least 6 characters"
                  :rules="[rules.required, rules.validClassname]"
                  type="text"
                  clearable
                  required>
                </v-text-field>
              </v-flex>
            <h2 class="text-xs-left align-left">Login Information</h2>
               <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="username"
                  label="Username"
                  v-model="username"
                  type="text"
                  clearable
                  :rules="[rules.required, rules.validUsername,rules.counterName]"
                  required>
                </v-text-field>
              </v-flex>
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
              <v-btn dark color="#43425D" @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn dark color="#43425D" type="submit">
                Create
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
    dialog: Boolean
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      showPassword: false,
      showConfirmPassword: false,
      vnuemail: '',
      classname: '',
      role: '2',
      rules: {
        required: value => !!value || 'Required.',
        counterName: value => value.length >= 3 || 'At least 3 charecters',
        validUsername: value => {
          const pattern = /^[[a-zA-Z0-9_]+$/
          return pattern.test(value) || 'Username only contains characters, digits and "_"'
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
    createAccount () {
      let data = {
        role: this.role,
        username: this.username,
        password: this.password,
        fullname: this.fullname,
        vnuemail: this.vnuemail,
        classname: this.classname
      }
      console.log(data)
      this.$store.dispatch('admin/createAccount', data)
        .then(() => {
          let snackbarMessage = 'Create account successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.$store.dispatch('admin/getAllAccounts')
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
