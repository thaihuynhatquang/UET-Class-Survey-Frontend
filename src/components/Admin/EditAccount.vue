<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>Edit Account - {{ userInfo.role   }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <form @submit.prevent="editAccount">
          <v-layout wrap>
            <h2 class="text-xs-left align-left">Login Information</h2>
            <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="username"
                label="Username"
                v-model="userInfo.username"
                type="text"
                clearable
                :rules="[rules.required, rules.validUsername,rules.counterName]"
                required>
              </v-text-field>
            </v-flex>
            <h2 class="text-xs-left align-left">User Information</h2>
            <v-flex xs11>
              <v-text-field
                color="#43425D"
                name="fullname"
                label="Fullname"
                v-model="userInfo.fullname"
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
                v-model="userInfo.vnuemail"
                hint="At least 6 characters"
                :rules="[rules.required, rules.isEmail]"
                type="text"
                clearable
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs11 v-if="userInfo.role == 'Student'">
              <v-text-field
                color="#43425D"
                name="classname"
                label="Class Name"
                v-model="userInfo.classname"
                :rules="[rules.required, rules.validClassname]"
                type="text"
                clearable
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
      rules: {
        required: value => !!value || 'Required.',
        counterName: value => value.length >= 3 || 'At least 3 charecters',
        validUsername: value => {
          const pattern = /^[[a-zA-Z0-9_]+$/
          return pattern.test(value) || 'Username only contains characters, digits and "_"'
        },
        isEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@vnu.edu.vn$/
          return pattern.test(value) || 'Email must be VNU mail. Ex: 16021113@vnu.edu.vn'
        },
        validClassname: value => {
          const pattern = /^QH-[0-9]{4}-I\/CQ-[a-zA-Z-]+$/
          return pattern.test(value) || 'Example format: QH-2016-I/CQ-C-CLC'
        }
      }
    }
  },
  methods: {
    editAccount () {
      let role = ''
      if (this.userInfo.role === 'Student') {
        role = '3'
      } else {
        role = '2'
      }
      let data = {
        username: this.userInfo.username,
        fullname: this.userInfo.fullname,
        vnuemail: this.userInfo.vnuemail,
        id: this.userInfo.userId,
        role: role,
        classname: this.userInfo.classname
      }
      console.log(data)
      this.$store.dispatch('admin/editAccount', data)
        .then(() => {
          let snackbarMessage = 'Update account successfully'
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
