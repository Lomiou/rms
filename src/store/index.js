import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import userlist from './userlist'
export default new vuex.Store({
  modules: {
    userlist
  }
})