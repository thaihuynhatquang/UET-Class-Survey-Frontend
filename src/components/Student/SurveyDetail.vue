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
    <v-layout class="layout" align-start justify-center row fill-height>
      <v-flex>
        <v-card class="card-survey-content">
          <v-list>
          <!-- <template v-for="(item, index) in items">
            <v-list-tile :key="index" class="my-4 mx-4 class-box">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"  id="listItem"></v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
            </v-list-tile>
          </template> -->
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    title: String
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
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
.layout {
  margin: 20px;
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
.card-survey {
  background-color: #DBDBDB;
}
.card-survey-content {
  border-radius: 20px;
}
</style>
