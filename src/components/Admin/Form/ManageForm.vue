<template>
  <v-layout class="layout-form-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-card class="card-course-overview">
        <v-btn transition="slide-y-reverse-transition" v-if="addNewCriteria === false" @click="addNewCriteria = true" color="mainColor" flat style="margin-left: 0px; margin-right: 0px;">
          <v-icon color="mainColor" medium>add_circle_outline</v-icon>
          <span class="listCriteria" style="margin-left: 5px;">Add New Criteria</span>
        </v-btn>
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
        <template v-for="(item, index) in items">
          <v-divider :key="`divider-${index}`"></v-divider>
          <v-card :key="index" flat  class="my-2 mx-2">
            <v-list-tile>
              <v-flex >
                <span class="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
              </v-flex>
              <v-spacer></v-spacer>
              <v-tooltip bottom style="cursor: pointer">
                <v-icon slot="activator" color="mainColor" class="mr-4">delete</v-icon>
                <span>Delete</span>
              </v-tooltip>
              <v-tooltip bottom style="cursor: pointer">
                <v-icon slot="activator" color="mainColor">edit</v-icon>
                <span>Edit</span>
              </v-tooltip>
            </v-list-tile>
          </v-card>
<!--           <v-divider v-if="index + 1 === items.length" :key="`divider-${index + 1}`"></v-divider> -->
        </template>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loadingButtonIcon: false,
      addNewCriteria: false,
      newCriteria: '',
      rules: {
        required: value => !!value || 'Required.'
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
          this.$store.dispatch('admin/getForm')
          this.addNewCriteria = false
        })
      console.log(data)
    }
  },
  computed: {
    ...mapState({
      items: state => state.admin.form
    })
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
