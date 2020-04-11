<template>
  <HeaderDropdown placement="bottomRight">
    <span :class="{ [styles.dropDown]: true }">
      <GlobalOutlined title="语言" />
    </span>
    <a-menu
      slot="overlay"
      :class="{ [styles.menu]: true }"
      :selectedKeys="selectedLang"
    >
      <a-menu-item v-for="locale in locales" :key="locale">
        <span role="img" :aria-label="languageLabels[locale]">
          {{ languageIcons[locale] }} </span
        >{{ " " }} {{ languageLabels[locale] }}</a-menu-item
      >
    </a-menu>
  </HeaderDropdown>
</template>

<script>
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import { GlobalOutlined } from "@ant-design/icons-vue";
import styles from "./SelectLang.module.less";
export default {
  name: "SelectLang",
  components: { HeaderDropdown, GlobalOutlined },
  data() {
    return {
      styles,
      selectedLang: ["zh-CN"],
      locales: ["zh-CN", "zh-TW", "en-US", "pt-BR"],
      languageLabels: {
        "zh-CN": "简体中文",
        "zh-TW": "繁体中文",
        "en-US": "English",
        "pt-BR": "Português"
      },
      languageIcons: {
        "zh-CN": "🇨🇳",
        "zh-TW": "🇭🇰",
        "en-US": "🇺🇸",
        "pt-BR": "🇧🇷"
      }
    };
  },
  methods: {
    changeLang(key) {
      console.log(key);
    }
  }
};
</script>
