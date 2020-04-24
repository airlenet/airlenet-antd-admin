//runtime
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locales";
import './Antd'
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
import "./app.less";
Vue.config.productionTip = false;
// Vue.use(Antd);
Vue.prototype.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
