<template>
  <a-tooltip v-if="fullscreen" title="全屏">
    <FullscreenExitOutlined />
  </a-tooltip>
  <a-tooltip v-else title="全屏">
    <FullscreenOutlined />
  </a-tooltip>
</template>

<script>
import {
  FullscreenExitOutlined,
  FullscreenOutlined
} from "@ant-design/icons-vue";

export default {
  name: "FullScreenIcon",
  components: { FullscreenOutlined, FullscreenExitOutlined },
  data() {
    return {
      fullscreen: false
    };
  }
};
</script>
