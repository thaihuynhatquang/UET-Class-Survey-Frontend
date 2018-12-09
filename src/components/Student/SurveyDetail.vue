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
        <v-card class="abcxyz">
          <v-form @submit.prevent="onSubmit">
            <v-list two-line>
              <template v-for="(item, index) in radioGroup">
                <v-card :key="index" flat  class="my-4 mx-4 class-box">
                  <v-list-tile>
                    <v-flex xl8 lg8 md8 sm6 xs6>
                      <span id="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-radio-group row v-model="item.point" id="survey-radio-group">
                      <v-radio
                        v-for="n in 5"
                        :key="n"
                        :label= "`${n}`"
                        :value="n"
                        color="mainColor"
                        required
                      ></v-radio>
                    </v-radio-group>
                  </v-list-tile>
                </v-card>
              </template>
            </v-list>
            <v-layout row justify-center>
              <v-btn id="button" color="mainColor" dark type="submit">Submit</v-btn>
              <v-btn id="button" color="mainColor" dark>Cancel</v-btn>
            </v-layout>
          </v-form>
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
      points: [],
      radioGroup: []
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    onSubmit () {
      console.log(this.radioGroup)
    }
  },
  created () {
    for (let item of this.items) {
      this.radioGroup.push({
        criteria_id: item.id,
        criteria: item.criteria,
        point: 1
      })
    }
    console.log(this.radioGroup)
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
  border-radius: 20px
}
#button {
  border-radius: 15px;
  margin-left: 40px;
  margin-right: 40px;
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
.abcxyz {
  padding-bottom: 30px;
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
