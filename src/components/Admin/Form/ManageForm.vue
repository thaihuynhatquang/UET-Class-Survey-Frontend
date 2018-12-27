<template>
  <v-layout class="layout-form-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-card class="card-course-overview">
        <template v-if="statusUpdateFrom === true">
          <template  v-if="addNewCriteria === false">
            <v-layout row wrap>

              <v-btn transition="slide-y-reverse-transition" @click="addNewCriteria = true" color="mainColor" flat style="margin-left: 0px; margin-right: 0px;">
                <v-icon color="mainColor" medium>add_circle_outline</v-icon>
                <span class="listCriteria" style="margin-left: 5px;">Add New Criteria</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="mainColor" dark @click="revertToDefault">Revert to default</v-btn>
            </v-layout>
          </template>
          <form v-else @submit.prevent="createNewCriteria">
            <v-layout row wrap class="add-new-criteria">
              <v-flex xs11>
                <v-text-field
                  v-model="newCriteria"
                  label="New Criteria"
                  solo
                  type="text"
                  required
                >
                  <v-icon slot="append" @click="addNewCriteria = false" color="mainColor">close</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-tooltip bottom style="cursor: pointer">
                  <v-btn slot="activator" color="mainColor" dark flat type="submit">
                    <v-icon>send</v-icon>
                  </v-btn>
                  <span>Create</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </form>
        </template>
        <template v-else>
          <span class="listCriteria ml-4"><em>
            Note: You can't edit this form right now!</em>
          </span>
        </template>
        <template v-for="(item, index) in items">
          <v-divider :key="`divider-${index}`"></v-divider>
          <v-card :key="index" flat  class="my-2 mx-2">
            <v-list-tile>
              <v-flex>
                <span class="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
              </v-flex>
              <v-spacer></v-spacer>
              <template>
                <v-tooltip bottom style="cursor: pointer">
                  <v-icon @click="deleteCriteria(item)" slot="activator" color="mainColor" class="mr-4" :disabled="!statusUpdateFrom">delete</v-icon>
                  <span v-if="statusUpdateFrom">Delete</span>
                  <span v-else>Can't delete right now</span>
                </v-tooltip>
                <v-tooltip bottom style="cursor: pointer">
                  <v-icon @click="updateCriteria(item)" slot="activator" color="mainColor" :disabled="!statusUpdateFrom">edit</v-icon>
                  <span v-if="statusUpdateFrom">Edit</span>
                  <span v-else>Can't edit right now</span>
                </v-tooltip>
              </template>
            </v-list-tile>
          </v-card>
        </template>
      </v-card>
    </v-flex>
    <v-snackbar
      top
      v-model="snackbar.value"
      :color="snackbar.colorSnackbar"
      :timeout="snackbar.snackbarTimeout"
    >
      <v-icon v-if="snackbar.success === true">check_circle</v-icon>
      <v-icon v-else>error_outline</v-icon>
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog.editCriteria" max-width="600px">
      <edit-criteria
        @closeDialog='dialog.editCriteria=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :criteria="criteria"
        :key="dialog.key">
      </edit-criteria>
    </v-dialog>
    <v-dialog v-model="dialog.deleteCriteria" max-width="600px">
      <delete-criteria
        @closeDialog='dialog.deleteCriteria=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :key="dialog.key"
        :criteria="criteria">
      </delete-criteria>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import EditCriteria from './EditCriteria.vue'
import DeleteCriteria from './DeleteCriteria.vue'

export default {
  data () {
    return {
      loadingButtonIcon: false,
      addNewCriteria: false,
      criteria: {},
      newCriteria: '',
      rules: {
        required: value => !!value || 'Required.'
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        success: true,
        colorSnackbar: 'white'
      },
      dialog: {
        editCriteria: false,
        deleteCriteria: false,
        key: 0
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    createNewCriteria () {
      let data = {
        criteria: this.newCriteria
      }
      this.$store.dispatch('admin/createNewCriteria', data)
        .then(() => {
          this.snackbar.value = true
          this.snackbar.snackbarMessage = 'Create criteria successfully'
          this.$store.dispatch('admin/getForm')
          this.addNewCriteria = false
        })
      console.log(data)
    },
    deleteCriteria (item) {
      this.dialog.deleteCriteria = true
      this.dialog.key++
      this.criteria = item
      console.log(item)
    },
    updateCriteria (item) {
      this.dialog.editCriteria = true
      this.dialog.key++
      this.criteria = item
      console.log(item)
    },
    revertToDefault () {
      console.log('hello')
      this.$store.dispatch('admin/getDefaultCriteria')
        .then(() => {
          this.snackbar.value = true
          this.snackbar.snackbarMessage = 'Revert to default criteria successfully'
          this.$store.dispatch('admin/getForm')
        })
    }
  },
  computed: {
    ...mapState({
      items: state => state.admin.form,
      statusUpdateFrom: state => state.admin.statusForm
    })
  },
  components: {
    editCriteria: EditCriteria,
    deleteCriteria: DeleteCriteria
  }
}
</script>

<style scoped>
.layout-form-overview {
  margin: 10px;
}
.listCriteria {
  color: #43425D;
  font-size: 14px;
  font-weight: bold;
}
.card-course-overview {
  padding: 10px;
}
.button-in-dialog {
  border-radius: 15px;
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
}
.text-button-survey {
  color: white;
  font-size: 14px;
}
.add-new-criteria {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 25px;

}
</style>
