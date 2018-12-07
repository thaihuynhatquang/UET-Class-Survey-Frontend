<template>
  <v-layout id="layout" align-start justify-center row fill-height>
    <v-flex>
      <v-card id="card">
        <v-list two-line >
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" class="my-4 mx-4 class-box">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"  id="listItem"></v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-btn id="button" color="#43425D">
              <div id="textButton">Survey</div>
            </v-btn>
          </v-list-tile>
        </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Toán rời rạc (INT1103 1) - Đặng Cao Cường' },
        { title: 'Xác suất thống kê (MAT1101 1) - Đặng Thanh Hải' },
        { title: 'Phát triển ứng dụng web (INT3306 2) - Lê Đình Thanh' },
        { title: 'Giải tích 1 (MAT1041 2) - Nguyễn Văn Quang' },
        { title: 'Đồ họa máy tính (INT3304 1) - Ma Thị Châu' },
        { title: 'Tin học cơ sở 4 (INT1106 1) - Lê Sỹ Vinh' },
        { title: 'Phát triển ứng dụng web (INT3306 2) - Lê Đình Thanh' }
      ]
    }
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
