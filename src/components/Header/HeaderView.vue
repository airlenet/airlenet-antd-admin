<template>
  <a-layout-header
    :style="styleStr"
    :class="{ 'ant-pro-fixed-header': fixedHeader, 'ant-pro-top-menu': top() }"
  >
    <TopNavHeader
      v-if="top() && !mobile"
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
    styleStr() {
      return (
        "padding: 0px;width:" +
        (this.needSettingWidth()
          ? `calc(100% - ${this.collapsed ? 80 : this.siderWidth}px)`
          : "100%" + "z-index: 9,right: ") +
        (this.fixedHeader ? 0 : undefined)
      );
    }
  },
  methods: {
    top() {
      return this.layout === "topmenu";
    },
    needSettingWidth() {
      return (
        this.fixedHeader && this.hasSiderMenu && !this.top() && !this.mobile
      );
    }
  }
};
</script>
