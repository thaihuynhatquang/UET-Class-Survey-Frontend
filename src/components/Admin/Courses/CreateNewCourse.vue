<template>
  <v-card>
    <v-toolbar dark color="mainColor" class="myToolbar">
      <v-toolbar-title>New Course</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form @submit.prevent="createNewCourse">
        <v-container grid-list-md>
          <v-layout justify-center>
            <v-btn @click="$refs.importStudents.click()"><span style="color: #43425D">Import list students of this course</span></v-btn>
          </v-layout>
          <v-layout justify-center>
            <span style="color: #43425D;"><strong>File selected:</strong> {{ fileSelected.filename }}</span>
            <input hidden type="file" multiple="false" accept=".xlsx, .xls" ref="importStudents" @change="importListStudents" required>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm3 md3>
              <v-text-field
                label="Course ID"
                hint="INT3306 3"
                v-model="courseId"
                required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                label="Subject"
                hint="Phát triển ứng dụng Web"
                v-model="subject"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 md3>
              <v-text-field
                label="Credit"
                hint="3"
                v-model="credit"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm9 md9>
              <v-select
                :items="lecturers"
                item-text="fullname"
                item-value="id"
                label="Lecturer"
                v-model="lecturerId"
                required
              ></v-select>
            </v-flex>

            <v-flex xs12 sm3 md3>
              <v-text-field
                label="Place"
                hint="101-G2"
                v-model="place"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                label="Time"
                hint="Thứ 4 tiết 6-7"
                v-model="time"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-select
                :items='["I", "II"]'
                v-model="semester"
                label="Semester"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                label="Year"
                hint="2018 - 2019"
                v-model="year"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-btn
              v-if="isDisabled === true "
              color="mainColor"
              disabled
            >Create Course</v-btn>
            <v-btn dark v-else color="mainColor" type="submit">Create Course</v-btn>
          </v-layout>
        </v-container>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      courseId: '',
      credit: '',
      subject: '',
      lecturerId: '',
      year: '',
      semester: '',
      time: '',
      place: '',
      fileSelected: {
        listStudents: '',
        filename: ''
      },
      haveFile: false
    }
  },
  computed: {
    ...mapState({
      lecturers: state => state.admin.lecturers
    }),
    isDisabled () {
      return this.courseId === '' || this.credit === '' || this.subject === '' || this.lecturerId === '' || this.year === '' || this.semester === '' || this.time === '' || this.place === '' || this.haveFile === false || this.loading === false
    }
  },
  methods: {
    createNewCourse () {
      this.importListStudents()
      let formData = new FormData()
      formData.append('file', this.fileSelected.listStudents)
      formData.append('course_id', this.courseId)
      formData.append('credit', this.credit)
      formData.append('lecturer_id', this.lecturerId)
      formData.append('subject', this.subject)
      formData.append('year', this.year)
      formData.append('semester', this.semester)
      formData.append('time', this.time)
      formData.append('place', this.place)
      this.$store.dispatch('admin/createNewCourse', formData)
        .then(() => {
          let snackbarMessage = 'Create New Course successfully'
          let showSnackbar = true
          this.$emit('showSnackbar', showSnackbar)
          this.$emit('snackbarMessage', snackbarMessage)
          this.$store.dispatch('admin/getAllCourses')
          this.closeDialog()
        })
        .catch((err) => {
          this.$refs.importStudents.value = ''
          console.log(err.response.data.message)
        })
    },
    importListStudents () {
      this.fileSelected.listStudents = this.$refs.importStudents.files[0]
      if (this.fileSelected.listStudents !== undefined) {
        this.fileSelected.filename = this.fileSelected.listStudents.name
        this.haveFile = true
      } else {
        this.fileSelected.filename = ''
        this.haveFile = false
      }
    },
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    }
  }
}
</script>

<style scoped>

</style>
