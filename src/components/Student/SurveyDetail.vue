<template>
  <v-card class="card-survey">
    <v-toolbar dark color="mainColor">
      <v-btn icon dark @click="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title> {{ title }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click="closeDialog">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout align-start justify-center row fill-height>
      <v-flex>
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-card :key="index" flat  class="my-4 mx-4 class-box">
                <v-list-tile>
                  <v-flex xl8 lg8 md8 sm6 xs6>
                    <span id="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-radio-group row v-model="radioGroup.index" id="survey-radio-group">
                    <v-radio
                      v-for="n in 5"
                      :key="n"
                      :label= "`${n}`"
                      :value="n"
                      color="mainColor"
                    ></v-radio>
                  </v-radio-group>
                </v-list-tile>
              </v-card>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    dialog: Boolean,
    title: String
  },
  data () {
    return {
      radioGroup: []
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    }
  },
  computed: {
    ...mapState({
      items: state => state.student.forms
    })
  }
}
</script>

<style scoped>
#listCriteria {
  color: #43425D;
  font-size: 12px;
  font-weight: bold;
}
.class-box {
  border: 2.5px solid #43425D;
  border-radius: 20px;
}
#button {
  border-radius: 15px;
  text-transform: none !important;
}
#textButton {
  color: white;
  font-size: 20px;
}
#survey-radio-group {
  justify-content: flex-end;
}
.card-survey {
  background-color: #DBDBDB;
  padding: 20px;
}
.v-radio {
  flex-direction: column-reverse;
  text-align: center;
  justify-content: center;
  margin-right: 14px;

}
</style>

<style>
.v-input--selection-controls__input {
  margin-right: 0px;
}
.v-label.theme--light {
  font-size: 12px;
  font-weight: bold;
}
</style>
