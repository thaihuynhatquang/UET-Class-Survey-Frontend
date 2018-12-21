<template>
  <v-layout id="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-layout row>
        <v-spacer/>
        <v-btn color="mainColor" dark class="button-admin">Import List Accounts</v-btn>
        <v-dialog v-model="dialog.dialog1" max-width="600px">
          <v-btn slot="activator" color="mainColor" dark class="button-admin">Create New Account</v-btn>
          <create-account @closeDialog='dialog.dialog1=$event'></create-account>
        </v-dialog>
      </v-layout>
      <v-card id="card-course-overview">
        <v-data-table
          :headers="headers"
          :items="accounts"
          class="elevation-1 mytable"
          :pagination.sync="pagination"
          item-key="id"
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
              <span>Delete</span>
              <span>Update Password</span>
            </td>
            <td class="text-xs-left">{{ props.item.fullname }}</td>
            <td class="text-xs-left">{{ props.item.vnuemail }}</td>
            <td class="text-xs-left">{{ props.item.role }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import CreateAccount from './CreateAccount.vue'

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
        dialog1: false,
        dialog2: false,
        dialog3: false
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
    }
  },
  components: {
    createAccount: CreateAccount
  },
  watch: {
    dialog1 (val) {
      val || this.close()
    },
    dialog2 (val) {
      val || this.close()
    },
    dialog3 (val) {
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
