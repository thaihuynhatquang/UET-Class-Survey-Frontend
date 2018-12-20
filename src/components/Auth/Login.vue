<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md7 lg5 xl4>
        <v-card>
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
                    <v-btn dark color="#43425D" type="submit">
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
    <v-footer app clipped-left=false dark color="#43425D" class="pa-3 elevation-24" height="40px">
      <v-spacer></v-spacer>
      <!-- eslint-disable-next-line -->
      <div>&copy<strong> 2018 QBD Team</strong></div>
    </v-footer>
    <v-snackbar
      top
      v-model="snackbar.value"
      :color="snackbar.colorSnackbar"
      :timeout="snackbar.snackbarTimeout"
    >
      <v-icon>warning</v-icon>
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 6 || 'At least 6 characters'
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        colorSnackbar: '#FFFFFF'
      }
    }
  },
  methods: {
    onSignin () {
      let data = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', data)
        .then(() => {
          this.$store.dispatch('getUser')
            .then(() => {
              let role = localStorage.getItem('roleStatus')
              if (role === 'Student') {
                this.$router.push('/student')
              } else if (role === 'Lecturer') {
                this.$router.push('/lecturer')
              } else if (role === 'Admin') {
                this.$router.push('/admin')
              }
            })
        })
        .catch(err => {
          this.snackbar.snackbarMessage = err.response.data.message
          this.snackbar.value = true
        })
    }
  }
}
</script>

<style scoped>

</style>
