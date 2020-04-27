<template>
  <a-result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  >
    <a-button slot="extra" type="primary" @click="() => $router.push('/')">
      Back Home
    </a-button>
  </a-result>
</template>

<script>
export default {
  name: "NoFoundPage"
};
</script>
