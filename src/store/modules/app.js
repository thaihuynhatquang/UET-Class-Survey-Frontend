import { set, toggle } from '@/utils/vuex'

const namespaced = true

const mutations = {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer')
}

const state = {
  drawer: null,
  color: 'mainColor',
  image: require('@/assets/Background.png')
}

export default {
  state,
  mutations,
  namespaced
}
