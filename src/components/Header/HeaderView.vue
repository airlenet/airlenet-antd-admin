<template>
  <div>
    <a-layout-header v-if="fixedHeader" />
    <a-layout-header
      :style="{
        padding: '0px',
        zIndex: 9,
        width: needSettingWidth
          ? 'calc(100% - ' + (collapsed ? 80 : siderWidth) + 'px)'
          : '100%',
        right: fixedHeader ? '0px' : 'auto'
      }"
      :class="{
        ['ant-pro-fixed-header']: fixedHeader,
        ['ant-pro-top-menu']: top
      }"
    >
      <TopNavHeader
        v-if="top && !mobile"
        :logo="logo"
        :title="title"
        :theme="theme"
        :menuData="menuData"
        mode="horizontal"
      >
        <template slot="rightContent">
          <slot name="rightContent"></slot
        ></template>
      </TopNavHeader>
      <GlobalHeader
        v-else
        @onCollapse="
          c => {
            this.$emit('onCollapse', c);
          }
        "
        :rightContent="rightContent"
        :logo="logo"
        :collapsed="collapsed"
        :mobile="mobile"
      >
        <template slot="rightContent">
          <slot name="rightContent"></slot
        ></template>
      </GlobalHeader>
    </a-layout-header>
  </div>
</template>

<script>
import TopNavHeader from "../TopNavHeader/TopNavHeader";
import GlobalHeader from "./GlobalHeader";
import "./Header.less";
export default {
  name: "HeaderView",
  components: { GlobalHeader, TopNavHeader },
  props: {
    fixedHeader: {},
    layout: {},
    hasSiderMenu: {},
    siderWidth: {},
    mobile: {},
    theme: {},
    logo: {},
    collapsed: {},
    rightContent: {},
    title: {},
    menuData: {}
  },
  computed: {
    top() {
      return this.layout === "topmenu";
    },
    needSettingWidth() {
      return this.fixedHeader && this.hasSiderMenu && !this.top && !this.mobile;
    }
  }
};
</script>
