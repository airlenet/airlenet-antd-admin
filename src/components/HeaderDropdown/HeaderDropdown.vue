<template>
  <a-dropdown
    :overlayClassName="cls"
    :placement="placement"
    :trigger="trigger"
    :visible="inVisible"
    @visibleChange="
      v => {
        this.inVisible = v;
        this.$emit('onVisibleChange', v);
      }
    "
  >
    <slot />
    <template slot="overlay"> <slot name="overlay"></slot></template>
  </a-dropdown>
</template>

<script>
import "./HeaderDropdown.less";
export default {
  name: "HeaderDropdown",
  props: {
    overlayClassName: {
      type: String
    },
    placement: {
      type: String,
      default: "bottomLeft"
    },
    trigger: {},
    visible: {}
  },
  data() {
    return {
      inVisible: this.visible ? this.visible : false
    };
  },
  computed: {
    cls() {
      if (this.overlayClassName) {
        return "container " + this.overlayClassName;
      } else {
        return "container";
      }
    }
  }
};
</script>
