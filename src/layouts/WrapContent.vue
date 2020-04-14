<template>
  <div :style="{ minHeight: contentHeight + 'px' }">
    <a-layout-content ref="layout-content" :class="className" :style="styleStr">
      <a-config-provider :getPopupContainer="getPopupContainer">
        <div ref="content" class="ant-pro-basicLayout-children-content-wrap">
          <slot />
        </div>
      </a-config-provider>
    </a-layout-content>
  </div>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";
import _ from "lodash";
export default {
  name: "WrapContent",
  props: {
    className: {},
    styleStr: {},
    isChildrenLayout: {}
  },
  data() {
    return {
      resizeObserver: null,
      contentHeight: 500,
      mainContent: null,
      clientHeight: 500
    };
  },
  updated: () => {},
  methods: {
    // eslint-disable-next-line
      getPopupContainer(el, dialogContext) {
      if (this.isChildrenLayout && this.$ref.content) {
        return this.$ref.content;
      }
      return document.body;
    },
    resize: _.debounce(function(height) {
      this.contentHeight =
        height < this.clientHeight - 200 ? this.clientHeight - 200 : height;
    }, 100)
  },
  mounted() {
    this.$nextTick(function() {
      this.mainContentEL = this.$refs["layout-content"].$el;
      this.resizeObserver = new ResizeObserver(entries => {
        let mainHeight = this.contentHeight;
        entries.forEach(entry => {
          const { height } = entry.contentRect;
          if (entry.target == this.mainContentEL) {
            mainHeight = height;
          } else {
            this.clientHeight = height;
          }
        });
        this.resize(mainHeight);
      });
      this.resizeObserver.observe(this.mainContentEL);
      this.resizeObserver.observe(document.body);
    });
  },
  destroyed() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.mainContentEL);
    }
    this.resizeObserver = null;
  }
};
</script>
