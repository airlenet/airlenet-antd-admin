<template>
  <div class="ant-pro-global-header">
    <span v-if="mobile" class="ant-pro-global-header-logo" key="logo">
      <img :src="logo" alt="logo" />
    </span>
    <span class="ant-pro-global-header-trigger" @click="toggle">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </span>
    <div style=" flex: 1 " />
    <slot name="rightContent"></slot>
  </div>
</template>

<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import "./GlobalHeader.less";
export default {
  name: "GlobalHeader",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    mobile: {},
    logo: {},
    collapsed: {}
  },
  methods: {
    toggle() {
      this.$emit("onCollapse", !this.collapsed);
    }
  }
};
</script>
