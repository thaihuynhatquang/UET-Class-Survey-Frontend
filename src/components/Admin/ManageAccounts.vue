<template>
  <v-layout id="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-layout row>
        <v-spacer/>
        <v-btn color="mainColor" dark class="button-admin">Import List Accounts</v-btn>
        <v-dialog v-model="dialog.createAccount" max-width="600px">
          <v-btn slot="activator" color="mainColor" dark class="button-admin">Create New Account</v-btn>
          <create-account
            @closeDialog='dialog.createAccount=$event'
            @showSnackbar='snackbar.value=$event'
            @snackbarMessage='snackbar.snackbarMessage=$event'>
          </create-account>
        </v-dialog>
      </v-layout>
      <v-card id="card-course-overview">
        <v-data-table
          :headers="headers"
          :items="accounts"
          class="elevation-1 mytable"
          :pagination.sync="pagination"
          item-key="id"
          :rows-per-page-items="[10]"
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.text"
                @click="changeSort(header.value)"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                >
                {{ header.text }}
                <v-icon small>arrow_upward</v-icon>
              </th>
            </tr>
          </template>
          <template slot="no-data">
            <v-progress-linear :indeterminate="true" color="#43425D"></v-progress-linear>
          </template>
           <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              {{ props.item.username }}
              <br>
              <span>Edit</span>
              <span @click="[dialog.deleteAccount=true, getUserId(props.item.id)]" style="cursor: pointer;">Delete</span>
              <span @click="[dialog.updatePassword=true, getUserId(props.item.id), getUser(props.item.fullname)]" style="cursor: pointer;">Update Password</span>
            </td>
            <td class="text-xs-left">{{ props.item.fullname }}</td>
            <td class="text-xs-left">{{ props.item.vnuemail }}</td>
            <td class="text-xs-left">{{ props.item.role }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-snackbar
      top
      v-model="snackbar.value"
      :color="snackbar.colorSnackbar"
      :timeout="snackbar.snackbarTimeout"
    >
      <v-icon>check_circle</v-icon>
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog.deleteAccount" max-width="400px">
      <delete-account
        @closeDialog='dialog.deleteAccount=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :userId="userId">
      </delete-account>
    </v-dialog>
    <v-dialog v-model="dialog.updatePassword" max-width="600px">
      <update-password
        @closeDialog='dialog.updatePassword=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :userId="userId"
        :name="name">
      </update-password>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import CreateAccount from './CreateAccount.vue'
import DeleteAccount from './DeleteAccount.vue'
import UpdatePassword from './UpdatePassword.vue'

export default {
  data () {
    return {
      headers: [
        {
          text: 'USERNAME',
          value: 'username',
          sortable: false
        },
        {
          text: 'FULL NAME',
          value: 'fullname',
          sortable: false
        },
        {
          text: 'EMAIL',
          value: 'vnuemail',
          sortable: false
        },
        {
          text: 'ROLE',
          value: 'role'
        }
      ],
      pagination: {
        sortBy: 'name'
      },
      dialog: {
        createAccount: false,
        deleteAccount: false,
        updatePassword: false
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        colorSnackbar: 'white'
      },
      userId: '',
      username: ''
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.admin.accounts
    })
  },
  methods: {
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    getUserId (userId) {
      this.userId = userId.toString()
      console.log(userId)
    },
    getUser (name) {
      this.name = name
      console.log(this.name)
    }
  },
  components: {
    createAccount: CreateAccount,
    deleteAccount: DeleteAccount,
    updatePassword: UpdatePassword
  },
  watch: {
    createAccount (val) {
      val || this.close()
    },
    deleteAccount (val) {
      val || this.close()
    },
    updatePassword (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped>
#layout-course-overview {
  margin: 10px;
}
.mytable .v-table thead tr th {
  color: #43425D;
  font-size: 13px;
  font-weight: bold;
  text-align:  left;
}
.mytable .v-table thead tr th.column.sortable.active {
  color: #43425b;
}
.mytable .v-table thead tr th.column.sortable:hover {
  color: #43425D;
}
.mytable .v-table tbody td {
  color: #43425D;
  font-size: 13px;
  font-weight: bold;
}
.mytable .v-table tbody td span{
  color: #43425D;
  font-size: 13px;
  font-style: italic;
  font-weight: normal;
  padding-right: 5px;
}
.button-admin {
  margin-bottom: 20px;
  text-transform: none !important;
  font-size: 13px;
}
</style>
