<template>
  <div>
    <div :style="'minHeight:' + contentHeight">
      <a-layout-content :class="className" :style="styleStr">
        <a-config-provider :getPopupContainer="getPopupContainer">
          <div
            ref="content"
            className="ant-pro-basicLayout-children-content-wrap"
          >
            <slot />
          </div>
        </a-config-provider>
      </a-layout-content>
    </div>
  </div>
</template>

<script>
export default {
  name: "WrapContent",
  props: {
    contentHeight: {},
    className: {},
    styleStr: {},
    isChildrenLayout: {}
  },
  data() {
    return {};
  },
  methods: {
    // eslint-disable-next-line
    getPopupContainer(el, dialogContext) {
      if (this.isChildrenLayout && this.$ref.content) {
        return this.$ref.content;
      }
      return document.body;
    }
  }
};
</script>
