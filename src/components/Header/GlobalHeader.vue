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
import { isBrowser } from "@/utils/utils";
export default {
  name: "GlobalHeader",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    mobile: {},
    logo: {},
    collapsed: {},
    onCollapse:{
      type:Function
    }
  },
  methods: {
    toggle() {
      if(this.onCollapse){
        this.onCollapse(!this.collapsed)
      }else{
        this.$emit("onCollapse", !this.collapsed);
      }
      this.triggerResizeEvent();
    },
    triggerResizeEvent() {
      if (isBrowser()) {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, false);
        window.dispatchEvent(event);
      }
    }
  }
};
</script>
