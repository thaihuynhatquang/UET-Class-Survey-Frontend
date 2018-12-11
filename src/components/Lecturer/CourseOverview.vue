<template>
  <v-layout id="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-card id="card-course-overview">
        <v-list two-line >
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" class="my-4 mx-4 class-box">
            <v-list-tile-content>
              <span id="list-courses">[{{ item.course_id }}] {{ item.subject }}</span>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-btn id="button_survey"
              color="#43425D"
              @click="getDialog(item.course_id, '[' + item.course_id + '] ' + item.subject)">
              <div id="text-button-survey">View Survey</div>
            </v-btn>
          </v-list-tile>
        </template>
        </v-list>
      </v-card>
      <v-dialog v-model="dialog.dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <view-survey
          :key="dialog.key"
          @closeDialog='dialog.dialog=$event'
          :title="dialog.title"
          :course_id="dialog.id"
        >
        </view-survey>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import ViewSurvey from './ViewSurvey'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      dialog: {
        dialog: false,
        title: '',
        key: 0,
        id: ''
      }
    }
  },
  methods: {
    getDialog (courseId, title) {
      this.dialog.title = title
      this.dialog.dialog = true
      this.dialog.id = courseId
      this.dialog.key++
      this.getSurvey(courseId)
    },
    getSurvey (courseId) {
      let data = {
        course_id: courseId
      }
      console.log(data)
      this.$store.dispatch('lecturer/getResultSurvey', data)
    }
  },
  components: {
    viewSurvey: ViewSurvey
  },
  computed: {
    ...mapState({
      items: state => state.lecturer.courses
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
