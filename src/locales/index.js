import Vue from "vue";
import VueI18n from "vue-i18n";
import zhCnLocale from "./zh-CN";
import zhTwLocale from "./zh-TW";
import enUsLocale from "./en-US";
Vue.use(VueI18n);
// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
const localLang = navLang === "zh-CN" || navLang === "en-US" ? navLang : false;
let lang = localLang || "zh-CN";

Vue.config.lang = lang;

// vue-i18n 6.x+写法
Vue.locale = () => {};
const messages = {
  "zh-CN": Object.assign(zhCnLocale),
  "zh-TW": Object.assign(zhTwLocale),
  "en-US": Object.assign(enUsLocale)
};
const i18n = new VueI18n({
  locale: lang,
  messages
});
export default i18n;
