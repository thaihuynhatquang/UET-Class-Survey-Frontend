<template>
  <v-card class="card-survey">
    <v-toolbar dark color="mainColor">
      <v-btn icon dark @click="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title> {{ title }} </v-toolbar-title>
    </v-toolbar>
    <v-layout align-start justify-center column fill-height>
      <v-flex class="survey-info-top">
        <span class="text-survey-info"><em><strong>Tên học phần:</strong> {{ title }}</em></span><br>
        <span class="text-survey-info"><em><strong>Tên giảng viên:</strong> {{ lecturerName }} </em></span><br>
        <span class="text-survey-info"><em><strong>Số lượng sinh viên đánh giá:</strong> {{ surveyInfo.num_student_of_course }}</em></span><br>
        <span class="text-survey-info"><em><strong>Số lượng giảng viên tham gia dạy môn học tương tự:</strong> {{ surveyInfo.num_course_of_subject }}</em></span><br>
        <span class="text-survey-info"><em><strong>Số lượng môn học giảng viên tham gia giảng dạy:</strong> {{ surveyInfo.num_course_of_lecturer }}</em></span><br>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center row fill-height>
      <v-flex>
        <v-list three-line>
          <template v-for="(item, index) in surveyResult">
            <v-card :key="index" flat  class="my-4 mx-4 class-box">
              <v-list-tile>
                <v-flex xl6 lg6 md5 sm5 xs5>
                  <span id="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xl6 lg6 md6 sm6 xs7>
                  <v-layout justify-end row>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">M: <strong>{{ item.M }}</strong></span>
                        <span>Giá trị trung bình của các tiêu chí theo lớp học phần</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">STD: <strong>{{ item.STD }}</strong></span>
                        <span>Độ lệch chuẩn của các tiêu chí theo lớp học phần</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">M1: <strong>{{ item.M1 }}</strong></span>
                        <span>Giá trị trung bình của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên cho các giảng viên dạy cùng môn học</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">STD1: <strong>{{ item.STD1 }}</strong></span>
                        <span>Độ lệch chuẩn của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên cho các giảng viên dạy cùng môn học</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">M2: <strong>{{ item.M2 }}</strong></span>
                        <span>Giá trị trung bình của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên về các môn học đã thực hiện giảng dạy</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <span slot="activator" class="text-survey-info">STD2: <strong>{{ item.STD2 }}</strong></span>
                        <span>Độ lệch chuẩn  của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên về các môn học đã thực hiện giảng dạy</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-list-tile>
            </v-card>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center column fill-height>
      <v-flex class="survey-info-bottom">
        <span class="text-survey-info"><strong>Ghi chú</strong></span><br>
        <span class="text-survey-info"><strong>- M:</strong> giá trị trung bình của các tiêu chí theo lớp học phần</span><br>
        <span class="text-survey-info"><strong>- STD:</strong> độ lệch chuẩn của các tiêu chí theo lớp học phần</span><br>
        <span class="text-survey-info"><strong>- M1:</strong> giá trị trung bình của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên cho các giảng viên dạy cùng môn học với thầy/cô</span><br>
        <span class="text-survey-info"><strong>- STD1:</strong> độ lệch chuẩn của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên cho các giảng viên dạy cùng môn học với thầy/cô</span><br>
        <span class="text-survey-info"><strong>- M2:</strong> giá trị trung bình của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên về các môn học mà thầy/cô đã thực hiện giảng dạy</span><br>
        <span class="text-survey-info"><strong>- STD2:</strong> độ lệch chuẩn  của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên về các môn học mà thầy/cô đã thực hiện giảng dạy</span><br>
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
    }
  },
  computed: {
    ...mapState({
      surveyResult: state => state.lecturer.surveyResult,
      surveyInfo: state => state.lecturer.surveyInfo,
      lecturerName: state => state.user.fullname
    })
  }
}
</script>

<style scoped>
.card-survey {
  background-color: #FFFFFF;
  padding: 20px;
}
.survey-info-bottom {
  margin-bottom: 30px;
  margin-left: 30px;
}
.survey-info-top {
  margin-top: 20px;
  margin-left: 30px;
}
.text-survey-info {
  color: #43425D;
  font-size: 13px;
}
.class-box {
  border: 2.5px solid #43425D;
  border-radius: 20px
}
#listCriteria {
  color: #43425D;
  font-size: 12px;
  font-weight: bold;
}
</style>
