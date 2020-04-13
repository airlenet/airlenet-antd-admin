<template>
  <a-layout-sider
    :width="siderWidth"
    :class="{
      'ant-pro-sider-menu-sider': true,
      ['fix-sider-bar']: fixSiderbar,
      light: theme === 'light'
    }"
  >
    <div class="ant-pro-sider-menu-logo" @click="onMenuHeaderClick" id="logo">
      <a href="/">
        <img :src="logo" alt="logo" />
        <h1 v-if="!collapsed">{{ title }}</h1>
      </a>
    </div>
  </a-layout-sider>
</template>

<script>
import "./SideMenu.less";
export default {
  name: "SiderMenu",
  props: {
    logo: {
      default:
        "https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg"
    },
    title: {},
    collapsed: {},
    fixSiderbar: {},
    theme: {},
    siderWidth: {
      default: 256
    },
    mobile: {},
    className: {},
    breakpoint: {
      default: "lg"
    },
    styleStr: {},
    links: {}
  },
  methods: {
    onMenuHeaderClick() {}
  }
};
</script>
