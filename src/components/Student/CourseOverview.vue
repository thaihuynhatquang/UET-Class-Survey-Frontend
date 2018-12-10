<template>
  <v-layout id="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-card id="card-course-overview">
        <v-list two-line >
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" class="my-4 mx-4 class-box">
            <v-list-tile-content>
              <span id="list-courses">{{ item.subject }} ({{ item.course_id }}) - {{ item.lecturers }}</span>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-btn v-if="item.done === 0" id="button_survey" color="#43425D" @click="getTitleDialog(item.course_id, item.subject + ' ' + '(' + item.course_id + ')' + ' - ' + item.lecturers)">
              <div id="text-button-survey">Survey</div>
            </v-btn>
            <v-tooltip v-else bottom>
              <v-btn slot="activator" color="#43425D" id="button_survey" disabled>
                <div id="text-button-survey">Survey</div>
              </v-btn>
              <span>Done</span>
            </v-tooltip>
          </v-list-tile>
        </template>
        </v-list>
        <v-snackbar
          top
          v-model="snackbar.value"
          :color="snackbar.colorSnackbar"
          :timeout="snackbar.snackbarTimeout"
        >
          <v-icon>check_circle</v-icon>
          <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
        </v-snackbar>
      </v-card>
        <v-dialog v-model="dialog.dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <app-survey-detail
            :key="dialog.key"
            @closeDialog='dialog.dialog=$event'
            :title="dialog.title"
            :course_id="dialog.id"
            @showSnackbar="showSnackbar($event)"
          />
        </v-dialog>
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
        key: 0,
        id: ''
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        colorSnackbar: 'white'
      }
    }
  },
  components: {
    appSurveyDetail: SurveyDetail
  },
  methods: {
    getTitleDialog (courseId, title) {
      this.dialog.title = title
      this.dialog.dialog = true
      this.dialog.id = courseId
      this.dialog.key++
    },
    showSnackbar (message) {
      this.snackbar.snackbarMessage = message
      this.snackbar.value = true
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
#list-courses {
  color: #43425D;
  font-size: 20px;
  font-weight: bold;
}
#layout-course-overview {
  margin: 10px;
}
#card-course-overview {
  border-radius: 20px;
}
.class-box {
  border: 2.5px solid #43425D;
  border-radius: 20px;
}
#button_survey {
  border-radius: 15px;
  text-transform: none !important;
}
#text-button-survey {
  color: white;
  font-size: 20px;
}
</style>
