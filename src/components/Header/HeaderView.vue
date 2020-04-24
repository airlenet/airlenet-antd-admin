<template>
  <fragment>
    <Layout.Header v-if="fixedHeader" />
    <Layout.Header
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
        :onCollapse="onCollapse"
        :rightContent="rightContent"
        :logo="logo"
        :collapsed="collapsed"
        :mobile="mobile"
      >
        <template slot="rightContent">
          <slot name="rightContent"></slot
        ></template>
      </GlobalHeader>
    </Layout.Header>
  </fragment>
</template>

<script>
import TopNavHeader from "../TopNavHeader/TopNavHeader";
import GlobalHeader from "./GlobalHeader";
import { Fragment } from "vue-fragment";
import "./Header.less";
import { Layout } from "ant-design-vue";
export default {
  name: "HeaderView",
  //eslint-disable-next-line
  components: { GlobalHeader, TopNavHeader ,Fragment,Layout},
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
    menuData: {},
    onCollapse: {
      type: Function
    }
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
