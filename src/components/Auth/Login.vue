<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 lg5 xl5>
        <v-card class="rounded-card">
          <!-- <v-toolbar dark color="#43425D">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar> -->
          <v-card-text>
            <h1 class="text-xs-center" style="color:#43425D;">Login</h1>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row fill-height align-center>
                  <v-flex xs1>
                    <v-icon large color="#43425D">person</v-icon>
                  </v-flex>
                  <v-flex xs11>
                    <v-text-field
                      color="#43425D"
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      clearable
                      :rules="[rules.required, rules.isEmail]"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row fill-height align-center>
                  <v-flex xs1>
                    <v-icon large color="#43425D">lock</v-icon>
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
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-btn class="rounded-button" dark color="#43425D" type="submit">
                      Login
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      rules: {
        isEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        required: value => !!value || 'Required.',
        counter: value => value.length >= 6 || 'At least 6 characters'
      }
    }
  },
  methods: {
    onSignin () {
      console.log(this.email, this.password, 'Click!')
      this.$router.replace('student/dashboard')
      //   firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      //   .then(
      //     user => this.$router.replace('dashboard')
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //       var errorCode = error.code
      //       var errorMessage = error.message
      //       if (errorCode === 'auth/user-not-found') {
      //         alert('Error: User not found')
      //       } else if (errorCode === 'auth/wrong-password') {
      //         alert('The password is incorrect')
      //       } else alert(errorMessage)
      //     }
      //   )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rounded-card{
    border-radius: 20px;
}
.rounded-button{
    border-radius: 15px;
}
</style>
