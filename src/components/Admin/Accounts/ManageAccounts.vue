<template>
  <v-layout class="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-layout row>
        <v-spacer/>
        <v-btn @click="dialog.importListAccounts=true" color="mainColor" dark class="button-admin">Import List Accounts</v-btn>
        <v-btn @click="dialog.createAccount=true" color="mainColor" dark class="button-admin">Create New Account</v-btn>
        <v-btn @click="dialog.deleteAllAccounts=true" color="mainColor" dark class="button-admin">Delete All Accounts</v-btn>
      </v-layout>
      <v-card class="card-course-overview">
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
            <v-card-text color="mainColor" text-xs-center>
              No accounts availble
            </v-card-text>
          </template>
           <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              {{ props.item.username }}
              <br>
              <span @click="[dialog.editAccount=true, getUserInfor(props.item)]" style="cursor: pointer;">Edit</span>
              <span @click="[dialog.deleteAccount=true, getUserInfor(props.item)]" style="cursor: pointer;">Delete</span>
              <span @click="[dialog.updatePassword=true, getUserInfor(props.item)]" style="cursor: pointer;">Update Password</span>
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

    <v-dialog v-model="dialog.importListAccounts" persistent max-width="400px">
      <import-list-accounts
        @closeDialog='dialog.importListAccounts=$event'
        @showSnackbar='snackbar.value=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'>
      </import-list-accounts>
    </v-dialog>
    <v-dialog v-model="dialog.createAccount" max-width="600px">
      <create-account
        @closeDialog='dialog.createAccount=$event'
        @showSnackbar='snackbar.value=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'>
      </create-account>
    </v-dialog>
    <v-dialog v-model="dialog.deleteAccount" max-width="400px">
      <delete-account
        @closeDialog='dialog.deleteAccount=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :userInfo="userInfo">
      </delete-account>
    </v-dialog>
    <v-dialog v-model="dialog.updatePassword" max-width="600px">
      <update-password
        @closeDialog='dialog.updatePassword=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :user="userInfo.userId"
        :name="userInfo.fullname">
      </update-password>
    </v-dialog>
    <v-dialog v-model="dialog.editAccount" max-width="600px">
      <edit-account
        @closeDialog='dialog.editAccount=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :userInfo="userInfo">
      </edit-account>
    </v-dialog>
    <v-dialog v-model="dialog.deleteAllAccounts" max-width="400px">
      <delete-all-accounts
        @closeDialog='dialog.deleteAllAccounts=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'>
      </delete-all-accounts>
    </v-dialog>    
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import CreateAccount from './CreateAccount.vue'
import DeleteAccount from './DeleteAccount.vue'
import UpdatePassword from './UpdatePassword.vue'
import EditAccount from './EditAccount.vue'
import ImportListAccounts from './ImportListAccounts.vue'
import DeleteAllAccounts from './DeleteAllAccounts.vue'

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
        updatePassword: false,
        editAccount: false,
        importListAccounts: false,
        deleteAllAccounts: false
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        colorSnackbar: 'white'
      },
      userInfo: {
        userId: '',
        username: '',
        fullname: '',
        role: '',
        vnuemail: '',
        classname: ''
      }
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
    getUserInfor (item) {
      this.userInfo.userId = item.id.toString()
      this.userInfo.username = item.username
      this.userInfo.fullname = item.fullname
      this.userInfo.vnuemail = item.vnuemail
      this.userInfo.classname = item.classname
      this.userInfo.role = item.role
    }
  },
  components: {
    createAccount: CreateAccount,
    deleteAccount: DeleteAccount,
    updatePassword: UpdatePassword,
    editAccount: EditAccount,
    importListAccounts: ImportListAccounts,
    deleteAllAccounts: DeleteAllAccounts
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
    },
    editAccount (val) {
      val || this.close()
    },
    importListAccounts (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped>
.layout-course-overview {
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
