<template>
  <li :class="cls" @click="onClick">
    <a-tooltip :title="tips" v-if="tips">
      <a-avatar :src="src" :size="size" :style="{ cursor: 'pointer' }" />
    </a-tooltip>
    <a-avatar v-else :src="src" :size="size" />
  </li>
</template>

<script>
import styles from "./index.module.less";

export default {
  name: "AvatarListItem",
  props: {
    src: {},
    tips: {},
    size: {},
    onClick: {
      type: Function,
      default: function() {
        return function() {};
      }
    }
  },
  data() {
    return { styles };
  },
  computed: {
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
