<template>
  <a-dropdown :overlayClassName="cls" :placement="placement">
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
    }
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
