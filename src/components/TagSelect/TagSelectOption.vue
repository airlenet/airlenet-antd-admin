<template>
  <a-checkable-tag :checked="currentChecked" :key="value" @change="change"
    ><slot></slot>
  </a-checkable-tag>
</template>

<script>
import { findComponentUpward } from "@/utils/assist";
export default {
  name: "TagSelectOption",

  props: {
    checked: Boolean,
    value: String
  },
  data() {
    return {
      isTagSelectOption: true,
      currentChecked: !!this.checked,
      parent: findComponentUpward(this, "TagSelect")
    };
  },
  methods: {
    change(checked) {
      this.currentChecked = checked;
      this.$emit("input", checked);
      if (this.parent) {
        this.parent.handleTagChange({
          value: this.value,
          checked: checked
        });
      }
    }
  }
};
</script>
