<template>
  <v-card class="card-survey">
    <v-layout align-start justify-center row fill-height>
      <v-flex xs12>
        <template v-for="(item, index) in items">
          <v-card :key="index" flat  class="my-2 mx-2">
            <v-list-tile>
              <v-flex >
                <span id="listCriteria">{{ index + 1 }}. {{ item.criteria }}</span>
              </v-flex>
              <v-spacer></v-spacer>
              Hello
            </v-list-tile>
          </v-card>
          <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
        </template>
        <v-layout row justify-center>
          <v-btn
            :loading="loadingButtonIcon"
            class="button-in-dialog"
            color="mainColor"
          >
            <div class="text-button-survey">Submit</div></v-btn>
          <v-btn class="button-in-dialog" color="mainColor" @click="closeDialog"><div class="text-button-survey">Cancel</div></v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
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
      items: state => state.admin.form
    })
  }
}
</script>

<style scoped>
#listCriteria {
  color: #43425D;
  font-size: 14px;
  font-weight: bold;
}
.button-in-dialog {
  border-radius: 15px;
  margin-left: 40px;
  margin-right: 40px;
}
.text-button-survey {
  color: white;
  font-size: 14px;
}
#survey-radio-group {
  justify-content: flex-end;
}
.card-survey {
  background-color: #FFFFFF;
  padding: 20px;
}
</style>
