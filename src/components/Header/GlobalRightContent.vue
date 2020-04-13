<template>
  <div
    :class="{
      [styles.right]: true,
      [styles.dark]: theme === 'dark' && layout === 'topmenu'
    }"
  >
    <HeaderSearch
      :className="styles.action + ' ' + styles.search"
      placeholder="站内搜索"
      defaultValue="umi ui"
      :options="options"
    />
    <a-tooltip title="使用文档">
      <a
        target="_blank"
        href="https://pro.ant.design/docs/getting-started"
        rel="noopener noreferrer"
        :class="{ [styles.action]: true }"
      >
        <QuestionCircleOutlined />
      </a>
    </a-tooltip>
    <NoticeIconView />
    <AvatarDropdown menu />

    <span>
      <a-tag :color="ENVTagColor[REACT_APP_ENV]">{{ REACT_APP_ENV }}</a-tag>
    </span>

    <SelectLang :class="{ [styles.action]: true }" />
  </div>
</template>

<script>
import styles from "./index.module.less";
import SelectLang from "../SelectLang/SelectLang";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import NoticeIconView from "./NoticeIconView";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import AvatarDropdown from "./AvatarDropdown";
export default {
  name: "GlobalRightContent",
  components: {
    AvatarDropdown,
    HeaderSearch,
    NoticeIconView,
    SelectLang,
    QuestionCircleOutlined
  },
  props: {
    layout: {},
    theme: {}
  },
  data() {
    return {
      REACT_APP_ENV: "dev",
      styles,
      ENVTagColor: {
        dev: "orange",
        test: "green",
        pre: "#87d068"
      },
      options: [
        {
          label: '<a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>',
          value: "umi ui"
        },
        {
          label: '<a href="next.ant.design">Ant Design</a>',
          value: "Ant Design"
        },
        {
          label: '<a href="https://protable.ant.design/">Pro Table</a>',
          value: "Pro Table"
        },
        {
          label: '<a href="https://prolayout.ant.design/">Pro Layout</a>',
          value: "Pro Layout"
        }
      ]
    };
  }
};
</script>
