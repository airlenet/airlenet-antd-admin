import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user";
import global from "./module/global";
import menu from "./module/menu";
import setting from "./module/setting.js";
import createLoadingPlugin from "./plugin/loading";
Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [createLoadingPlugin()],
  state: {},
  mutations: {},
  actions: {},
  modules: { global, user, menu, setting }
});

export default store;
