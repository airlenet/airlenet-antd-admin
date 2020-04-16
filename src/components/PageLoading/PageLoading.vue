<template>
  <div :style="{ paddingTop: '100px', textAlign: 'center' }">
    <a-spin size="large" :tip="tip" />
  </div>
</template>

<script>
export default {
  name: "PageLoading",
  props: {
    tip: {}
  }
};
</script>
