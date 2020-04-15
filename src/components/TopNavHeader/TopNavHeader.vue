<template>
  <div :class="{ 'ant-pro-top-nav-header': true, light: theme === 'light' }">
    <div
      :class="
        `${baseClassName}-main` + ' ' + (contentWidth === 'Fixed' ? 'wide' : '')
      "
    >
      <div :class="`${baseClassName}-left`" @click="onMenuHeaderClick">
        <div :class="`${baseClassName}-logo`" key="logo" id="logo">
          <a href="/">
            <img :src="logo" alt="logo" />
            <h1 v-if="!collapsed">{{ title }}</h1>
          </a>
        </div>
      </div>

      <div style="flex: 1" :class="`${baseClassName}-menu`">
        <BaseMenu
          :menuData="menuData"
          :theme="theme"
          :mode="mode"
          @handleOpenChange="openKeys => this.$emit('onOpenChange', openKeys)"
        />
      </div>
      <div :style="{ minWidth: rightSize }">
        <div ref="rightContent" :style="{ paddingRight: '8px' }">
          <slot name="rightContent"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./TopNavHeader.less";
import BaseMenu from "../SiderMenu/BaseMenu";
import ResizeObserver from "resize-observer-polyfill";
import _ from "lodash";
export default {
  name: "TopNavHeader",
  components: { BaseMenu },
  props: {
    contentWidth: {},
    collapsed: {},
    theme: {},
    logo: {},
    title: {},
    menuData: {},
    mode: {}
  },
  data() {
    return {
      baseClassName: "ant-pro-top-nav-header",
      resizeObserver: null,
      rightSize: "auto"
    };
  },
  methods: {
    onMenuHeaderClick() {},
    setRightSize: _.debounce(function(width) {
      this.rightSize = width + "px";
    }, 100)
  },
  mounted() {
    this.$nextTick(function() {
      this.resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        // eslint-disable-next-line
        const { width,height } = entry.contentRect;
        this.setRightSize(width);
      });
      this.resizeObserver.observe(this.$refs.rightContent);
    });
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$refs.rightContent);
    }
    this.resizeObserver = null;
  }
};
</script>
