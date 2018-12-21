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
                  <v-radio label="Student" value="3" color="#43425D"></v-radio>
                  <v-radio label="Lecturer" value="2" color="#43425D"></v-radio>
                </v-radio-group>
              </v-flex>
               <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="fullname"
                  label="Fullname"
                  id="fullname"
                  v-model="fullname"
                  type="text"
                  clearable
                  :rules="[rules.required]"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="vnuemail"
                  label="VNU Email"
                  id="vnuemail"
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
                  :rules="[rules.required]"
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
                  id="username"
                  v-model="username"
                  type="text"
                  clearable
                  :rules="[rules.required]"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  color="#43425D"
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  hint="At least 6 characters"
                  :rules="[rules.required, rules.counter]"
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
                  :rules="[comparePasswords, rules.required]">
                </v-text-field>
              </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex text-xs-center>
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
      role: '3',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 6 || 'At least 6 characters',
        isEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
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
          this.dialog = false
          this.$emit('closeDialog', this.dialog)
          this.$store.dispatch('admin/getAllAccounts')
        })
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
