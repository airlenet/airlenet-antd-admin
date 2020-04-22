<template>
  <div :class="[styles.listContent]">
    <div :class="[styles.description]">{{ content }}</div>
    <div :class="[styles.extra]">
      <a-avatar :src="avatar" size="small" />
      <a :href="href">{{ owner }}</a> 发布在 <a :href="href">{{ href }}</a>
      <em>{{ format(updatedAt) }}</em>
    </div>
  </div>
</template>

<script>
import styles from "./ArticalListContent.module.less";
import dayjs from "dayjs";

export default {
  name: "ArticleListContent",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return { ...this.data, styles };
  },
  methods: {
    format(updatedAt) {
      return dayjs(updatedAt).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped></style>
