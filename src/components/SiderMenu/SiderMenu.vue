<template>
  <a-layout-sider
    :width="siderWidth"
    :collapsed="collapsed"
    :class="{
      'ant-pro-sider-menu-sider': true,
      ['fix-sider-bar']: fixSiderbar,
      light: theme === 'light'
    }"
  >
    <!--headerDom-->
    <div class="ant-pro-sider-menu-logo" @click="onMenuHeaderClick" id="logo">
      <a href="/">
        <img :src="logo" alt="logo" />
        <h1 v-if="!collapsed">{{ title }}</h1>
      </a>
    </div>
    <!--flatMenus-->
    <BaseMenu
      :menuData="menuData"
      mode="inline"
      :theme="theme"
      style="padding: 16px 0; width: 100%"
      @handleOpenChange="openKeys => this.$emit('onOpenChange', openKeys)"
    />
  </a-layout-sider>
</template>

<script>
import "./SideMenu.less";
import BaseMenu from "./BaseMenu";
export default {
  name: "SiderMenu",
  components: { BaseMenu },
  props: {
    logo: {

    },
    title: {},
    collapsed: {},
    fixSiderbar: {},
    theme: {},
    siderWidth: {
      default: 256
    },
    menuData: {},
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
