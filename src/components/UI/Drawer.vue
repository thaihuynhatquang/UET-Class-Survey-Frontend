<template>
  <v-navigation-drawer v-model="drawer" app dark mobile-break-point="991" width="300">
    <v-img :src="image" height="100%" position="left">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img  :src="avatar" contain/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Thái Huy Nhật Quang</v-list-tile-title>
            <v-list-tile-sub-title>Student</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider id="divider"/>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      links:
      [
        {
          to: '/student/dashboard',
          icon: 'dashboard',
          text: 'Dashboard'
        },
        {
          to: '/student/user-profile',
          icon: 'person',
          text: 'User Profile'
        },
        {
          to: '/login',
          icon: 'arrow_back',
          text: 'Logout'
        }
      ]
    }
  },
  computed: {
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
</style>
