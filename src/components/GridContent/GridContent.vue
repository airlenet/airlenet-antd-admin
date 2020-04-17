<template>
  <div
    :class="[
      'ant-pro-grid-content',
      { ['wide']: contentWidth === 'Fixed' },
      className
    ]"
    :style="styleStr"
  >
    <slot />
  </div>
</template>

<script>
import "./GridContent.less";

export default {
  name: "GridContent",
  props: {
    contentWidth: {},
    className: {},
    styleStr: {}
  }
};
</script>
