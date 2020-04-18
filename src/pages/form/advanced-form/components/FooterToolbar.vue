<template>
  <div
    :class="[className, styles.toolbar]"
    :style="{
      width: getWidth(),
      transition: '0.3s all'
    }"
  >
    <div :class="styles.left">
      <slot name="extra" />
    </div>
    <div :class="styles.right">
      <slot />
    </div>
  </div>
</template>

<script>
import styles from "./FooterToolbar.module.less";

export default {
  name: "FooterToolbar",
  props: {
    className: {}
  },
  data() {
    return {
      styles
    };
  },
  methods: {
    getWidth() {
      let { collapsed, mobile, siderWidth } = this.$store.state.setting;

      const sider = document.querySelector(".ant-layout-sider");

      if (!sider) {
        return undefined;
      }
      return mobile
        ? undefined
        : `calc(100% - ${collapsed ? 80 : siderWidth || 256}px)`;
    }
  }
};
</script>
