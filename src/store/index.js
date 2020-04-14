import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user";
import global from "./module/global";
import menu from "./module/menu";
import setting from "./module/setting.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { global, user, menu, setting }
});
