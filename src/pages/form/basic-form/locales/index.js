import zhCnLocale from "./zh-CN.js";
import zhTwLocale from "./zh-TW.js";
import enUsLocale from "./en-US.js";
import ptBrLocale from "./pt-BR.js";

export const registerLocaleMessage = i18n => {
  i18n.setLocaleMessage(
    "zh-CN",
    Object.assign(i18n.getLocaleMessage("zh-CN"), zhCnLocale)
  );
  i18n.setLocaleMessage(
    "zh-TW",
    Object.assign(i18n.getLocaleMessage("zh-TW"), zhTwLocale)
  );
  i18n.setLocaleMessage(
    "en-US",
    Object.assign(i18n.getLocaleMessage("en-US"), enUsLocale)
  );
  i18n.setLocaleMessage(
    "pt-BR",
    Object.assign(i18n.getLocaleMessage("pt-BR"), ptBrLocale)
  );
};
