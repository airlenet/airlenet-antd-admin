<template>
  <router-view v-bind="$props" />
</template>

<script>
export default {
  name: "BlankLayout",
  props: {
    contentWidth: {}
  }
};
</script>
