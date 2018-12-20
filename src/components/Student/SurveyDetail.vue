<template>
  <v-card class="card-survey">
    <v-toolbar dark color="mainColor">
      <v-btn icon dark @click="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title> {{ title }} </v-toolbar-title>
    </v-toolbar>
    <v-layout align-start justify-center row fill-height>
      <v-flex>
          <v-form>
            <v-list>
              <template v-for="(item, index) in radioGroup">
                <v-card :key="index" flat  class="my-2 mx-2">
                  <v-list-tile>
                    <v-flex xl8 lg8 md8 sm6 xs6>
                      <span id="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-radio-group
                      row
                      v-model="item.point"
                      id="survey-radio-group">
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
                <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
              </template>
            </v-list>
            <v-layout row justify-center>
              <v-btn
                :loading="loadingButtonIcon"
                :disabled="disabled || loadingButtonIcon"
                class="button-in-dialog"
                color="mainColor"
                @click="onSubmit"
              >
                <div class="text-button-survey">Submit</div></v-btn>
              <v-btn class="button-in-dialog" color="mainColor" @click="closeDialog"><div class="text-button-survey">Cancel</div></v-btn>
            </v-layout>
          </v-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    dialog: Boolean,
    title: String,
    course_id: String
  },
  data () {
    return {
      points: [],
      radioGroup: [],
      loadingButtonIcon: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    onSubmit () {
      this.loadingButtonIcon = true
      let data = {
        course_id: this.course_id,
        points: []
      }
      for (let item of this.radioGroup) {
        data.points.push({
          criteria_id: item.criteria_id,
          point: item.point
        })
      }
      this.$store.dispatch('student/sendSurvey', data)
        .then(() => {
          console.log('Success')
          this.$store.dispatch('student/getCourses')
            .then(() => {
              this.closeDialog()
              this.$emit('showSnackbar', 'Send report successully')
            })
        })
      console.log(data.course_id)
    }
  },
  created () {
    for (let item of this.items) {
      this.radioGroup.push({
        criteria_id: item.id,
        criteria: item.criteria,
        point: 0
      })
    }
  },
  computed: {
    ...mapState({
      items: state => state.student.forms
    }),
    disabled () {
      for (let item of this.radioGroup) {
        if (item.point === 0) return true
      }
      return false
    }
  }
}
</script>

<style scoped>
#listCriteria {
  color: #43425D;
  font-size: 12px;
  font-weight: bold;
}
.button-in-dialog {
  border-radius: 15px;
  margin-left: 40px;
  margin-right: 40px;
}
.text-button-survey {
  color: white;
  font-size: 12px;
}
#survey-radio-group {
  justify-content: flex-end;
}
.card-survey {
  background-color: #FFFFFF;
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
