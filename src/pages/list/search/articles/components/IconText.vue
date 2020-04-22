<template>
  <span v-if="type == 'star-o'">
    <StarOutlined
      :style="{
        marginRight: 8
      }"
    />
    {{ text }}
  </span>
  <span v-else-if="type == 'like-o'">
    <LikeOutlined
      :style="{
        marginRight: 8
      }"
    />
    {{ text }}
  </span>

  <span v-else-if="type == 'message'">
    <MessageOutlined
      :style="{
        marginRight: 8
      }"
    />
    {{ text }}
  </span>
  <span v-else></span>
</template>

<script>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from "@ant-design/icons-vue";

export default {
  name: "IconText",
  props: {
    type: {
      type: String
    },
    text: {
      type: [String, Number]
    }
  },
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  }
};
</script>

<style scoped></style>
