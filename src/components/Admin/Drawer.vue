<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    mobile-break-point="991"
    width="300"
    floating
    persistent
  >
    <v-img :src="image" height="100%" position="left">
      <v-layout tag="v-list" column fill-height>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img  :src="avatar" contain/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ fullname }}
              <v-icon
                style="cursor: pointer;"
                small
                class="ml-2 mb-1"
                @click="[dialog=true, key++]"
              >edit
              </v-icon>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider id="divider"/>
        <v-list-tile :active-class="color" avatar to="/admin/accounts">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Manage Accounts</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :active-class="color" avatar to="/admin/surveys">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Manage Surveys</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :active-class="color" avatar to="/admin/form">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Manage Form</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :active-class="color" avatar @click.stop.prevent="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-layout>
    </v-img>
    <v-dialog v-model="dialog" max-width="400px">
      <edit-admin-password
        @closeDialog='dialog=$event'
        :userInfo="user"
        :key="key"
      >
      </edit-admin-password>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import EditAdminPassword from './EditAdminPassword.vue'

export default {
  data () {
    return {
      role: localStorage.getItem('roleStatus'),
      dialog: false,
      key: 0
    }
  },
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      fullname: state => state.user.fullname,
      avatar: state => state.avatar,
      user: state => state.user
    }),
    ...mapState('app', ['image', 'color']),
    drawer: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  components: {
    editAdminPassword: EditAdminPassword
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    onLogout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style >
#divider {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 30px;
  border-width: 1px;
}
#logo {
  margin-top: auto;
  margin-bottom: 30px;
}
</style>
