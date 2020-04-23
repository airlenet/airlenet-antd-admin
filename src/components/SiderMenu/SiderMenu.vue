<template>
  <a-layout-sider
    :width="siderWidth"
    :collapsed="collapsed"
    :class="{
      'ant-pro-sider-menu-sider': true,
      ['fix-sider-bar']: fixSiderbar,
      light: theme === 'light'
    }"
    @collapse="
      c => {
        if (!mobile) {
          this.$emit('onCollapse', c);
        }
      }
    "
    :breakpoint="breakpoint === false ? undefined : breakpoint"
  >
    <!--headerDom-->
    <div class="ant-pro-sider-menu-logo" @click="onMenuHeaderClick" id="logo">
      <a href="/">
        <img :src="logo" alt="logo" />
        <h1 v-if="!collapsed">{{ title }}</h1>
      </a>
    </div>
    <!--flatMenus-->
    <PageLoading v-if="!menuData || menuData.length == 0" />
    <BaseMenu
      v-else
      :menuData="menuData"
      mode="inline"
      :theme="theme"
      :flatMenuKeys="flatMenuKeys"
      style="padding: 16px 0; width: 100%"
      @handleOpenChange="openKeys => this.$emit('onOpenChange', openKeys)"
    />
  </a-layout-sider>
</template>

<script>
import "./SideMenu.less";
import BaseMenu from "./BaseMenu";

import PageLoading from "../PageLoading";
export default {
  name: "SiderMenu",
  components: { BaseMenu, PageLoading },
  props: {
    logo: {},
    title: {},
    collapsed: {},
    fixSiderbar: {},
    theme: {},
    siderWidth: {
      default: 256
    },
    flatMenuKeys: {},
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
