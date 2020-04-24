<template>
  <div :class="[styles.avatarList]">
    <ul>
      <SlotProps :slots="slots" :propsData="{ size: size }" />
      <li key="exceed" :class="cls" v-if="exceedCount > 0">
        <a-avatar :size="size" :style="excessItemsStyle">{{
          exceedCount
        }}</a-avatar>
      </li>
    </ul>
  </div>
</template>

<script>
import styles from "./index.module.less";
import SlotProps from "../SlotProps";

export default {
  name: "AvatarList",
  components: { SlotProps },
  props: {
    size: {},
    maxLength: {
      default: 5
    },
    excessItemsStyle: {}
  },
  data() {
    return {
      styles,
      slots: this.$slots.default
    };
  },
  computed: {
    exceedCount() {
      return this.$slots.default.length - this.maxLength;
    },
    cls() {
      return [
        styles.avatarItem,
        {
          [styles.avatarItemLarge]: this.size === "large",
          [styles.avatarItemSmall]: this.size === "small",
          [styles.avatarItemMini]: this.size === "mini"
        }
      ];
    }
  }
};
</script>
