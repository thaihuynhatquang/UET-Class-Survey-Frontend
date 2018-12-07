<template>
  <v-layout id="layout" align-start justify-center row fill-height>
    <v-flex>
      <v-card id="card">
        <v-list two-line >
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" class="my-4 mx-4 class-box">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.subject + ' ' + '(' + item.course_id + ')' + ' - ' + item.lecturers"  id="listItem"></v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>

            <v-dialog v-if="item.done === 0" v-model="dialog.dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <v-btn slot="activator" id="button" color="#43425D" @click="getTitleDialog(item.subject + ' ' + '(' + item.course_id + ')' + ' - ' + item.lecturers)">
                <div id="textButton">Survey</div>
              </v-btn>
              <app-survey-detail :key="dialog.key" @closeDialog='dialog.dialog=$event' :title="dialog.title"/>
            </v-dialog>
            <v-tooltip v-else bottom>
              <v-btn slot="activator" color="#43425D" id="button" disabled>
                <div id="textButton">Survey</div>
              </v-btn>
              <span>Done</span>
            </v-tooltip>
          </v-list-tile>
        </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SurveyDetail from './SurveyDetail'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      dialog: {
        dialog: false,
        title: '',
        key: 0
      }
    }
  },
  components: {
    appSurveyDetail: SurveyDetail
  },
  methods: {
    getTitleDialog (val) {
      this.dialog.title = val
      this.dialog.key++
    }
  },
  computed: {
    ...mapState({
      items: state => state.student.courses
    })
  }
}
</script>

<style scoped>
#listItem {
  color: #43425D;
  font-size: 20px;
  font-weight: bold;
}
#layout {
  margin: 10px;
}
#card {
  border-radius: 20px;
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
</style>
