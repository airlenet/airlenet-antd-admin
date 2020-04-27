<template>
  <div class="ant-space ant-space-horizontal">
    <div
      class="ant-space-item"
      v-for="(slot, index) in $slots.default"
      :key="index"
    >
      <SlotProps :slots="[slot]" />
    </div>
  </div>
</template>

<script>
import SlotProps from "../SlotProps/SlotProps";

export default {
  name: "Space",
  components: { SlotProps },
  props: {
    size: {}
  }
};
</script>

<style>
.ant-space {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}

.ant-space-horizontal {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.ant-space-item + .ant-space-item {
  margin-left: 8px;
}
</style>
