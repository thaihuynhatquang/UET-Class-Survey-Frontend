<template>
  <v-layout id="layout-course-overview" align-start justify-center row fill-height>
    <v-flex>
      <v-layout row>
        <v-spacer></v-spacer>
        <v-btn v-if="selected.length > 0" @click="deleteMultiCourses" color="mainColor" dark class="button-admin">Delete Courses</v-btn>
        <v-btn @click="createNewCourse" color="mainColor" dark class="button-admin">Create New Course</v-btn>
      </v-layout>
      <v-card id="card-course-overview">
        <v-card-title>
          <v-text-field color="mainColor" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table
          select-all
          v-model="selected"
          :headers="headers"
          :search="search"
          :items="courses"
          class="elevation-1 mytable"
          :pagination.sync="pagination"
          item-key="course_id"
          :rows-per-page-items="[10]"
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th>
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  color="mainColor"
                  hide-details
                  @click="toggleAll"
                ></v-checkbox>
              </th>
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
              No courses availble
            </v-card-text>
          </template>
           <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox
                  :input-value="props.selected"
                  color="mainColor"
                  hide-details
                ></v-checkbox>
              </td>
              <td class="justify-left px-4">
                <v-tooltip bottom style="cursor: pointer">
                  <v-icon
                  small
                  slot="activator"
                  color="mainColor"
                  class="mr-3"
                  @click="[getCourseInfo(props.item), viewResult()]">remove_red_eye</v-icon>
                  <span>View Course</span>
                </v-tooltip>
                <v-tooltip bottom style="cursor: pointer">
                  <v-icon
                  small
                  slot="activator"
                  color="mainColor"
                  class="mr-3"
                  @click="[getCourseInfo(props.item), deleteCourse()]">delete</v-icon>
                  <span>Delete Course</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">
                {{ props.item.course_id }}
              </td>
              <td class="text-xs-left">{{ props.item.subject }}</td>
              <td class="text-xs-left" style="font-weight: 700; color: #43425D">{{ props.item.fullname }}</td>
            </tr>
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
      <v-icon v-if="snackbar.success === true">check_circle</v-icon>
      <v-icon v-else>error_outline</v-icon>
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{ snackbar.snackbarMessage }}</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialog.viewResult" fullscreen hide-overlay transition="dialog-bottom-transition">
      <view-result
        @closeDialog='dialog.viewResult=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :courseInfo="courseInfo"
        :key="dialog.key"
        >
      </view-result>
    </v-dialog>
    <v-dialog persistent v-model="dialog.createNewCourse" max-width="600px">
      <create-new-course
        @closeDialog='dialog.createNewCourse=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        @success='snackbar.success=$event'
        :courseInfo="courseInfo"
        :key="dialog.key"
        >
      </create-new-course>
    </v-dialog>
    <v-dialog v-model="dialog.deleteCourse" max-width="400px">
      <delete-course
        @closeDialog='dialog.deleteCourse=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @showSnackbar='snackbar.value=$event'
        :courseInfo="courseInfo">
      </delete-course>
    </v-dialog>
    <v-dialog v-model="dialog.deleteMultiCourses" max-width="400px">
      <delete-multi-courses
        @closeDialog='dialog.deleteMultiCourses=$event'
        @snackbarMessage='snackbar.snackbarMessage=$event'
        @clearSelected='selected=$event'
        @showSnackbar='snackbar.value=$event'
        :selected="selected"
        :key="dialog.key">
      </delete-multi-courses>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ViewResultCourse from './ViewResultCourse.vue'
import CreateNewCourse from './CreateNewCourse.vue'
import DeleteCourse from './DeleteCourse.vue'
import DeleteMultiCourses from './DeleteMultiCourses.vue'

export default {
  data () {
    return {
      search: '',
      check: true,
      selected: [],
      headers: [
        {
          text: 'ACTIONS'
        },
        {
          text: 'COURSES ID',
          value: 'course_id'
        },
        {
          text: 'SUBJECT',
          value: 'subject'
        },
        {
          text: 'LECTURER',
          value: 'fullname'
        }
      ],
      pagination: {
        sortBy: 'name'
      },
      dialog: {
        viewResult: false,
        createNewCourse: false,
        deleteCourse: false,
        deleteMultiCourses: false,
        key: 0
      },
      snackbar: {
        value: false,
        snackbarMessage: '',
        snackbarTimeout: 3000,
        success: true,
        colorSnackbar: 'white'
      },
      courseInfo: {}
    }
  },
  computed: {
    ...mapState({
      courses: state => state.admin.courses
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
    getCourseInfo (item) {
      this.courseInfo = item
      console.log(this.courseInfo)
    },
    getCourseSurvey (lecturerId, courseId) {
      let data = {
        id: lecturerId,
        course_id: courseId
      }
      this.$store.dispatch('admin/getResultSurvey', data)
    },
    viewResult () {
      this.dialog.key++
      this.dialog.viewResult = true
      this.getCourseSurvey(this.courseInfo.id, this.courseInfo.course_id)
    },
    createNewCourse () {
      this.dialog.key++
      this.dialog.createNewCourse = true
    },
    deleteCourse () {
      this.dialog.deleteCourse = true
    },
    toggleAll () {
      if (this.check === true) {
        this.check = false
        if (this.selected.length === 0) {
          this.selected = this.courses.slice()
        } else if (this.selected.length === this.courses.length) {
          this.selected = []
        } else {
          this.selected = this.courses.slice()
        }
      }
      setTimeout(() => (this.check = true), 100)
    },
    deleteMultiCourses () {
      this.dialog.key++
      this.dialog.deleteMultiCourses = true
    }
  },
  components: {
    viewResult: ViewResultCourse,
    createNewCourse: CreateNewCourse,
    deleteCourse: DeleteCourse,
    deleteMultiCourses: DeleteMultiCourses
  },
  watch: {
    viewResult (val) {
      val || this.close()
    },
    createNewCourse (val) {
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
