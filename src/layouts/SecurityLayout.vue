<template>
  <PageLoading v-if="(!isLogin && userLoading) || !isReady" />
  <router-view v-else />
</template>

<script>
import PageLoading from "../components/PageLoading/PageLoading";
export default {
  name: "SecurityLayout",
  components: { PageLoading },
  data() {
    return {
      isReady: false,
      userLoading: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.user.currentUser;
    },
    isLogin() {
      return this.currentUser && this.currentUser.userid;
    }
  },
  mounted() {
    this.userLoading = true;
    this.$store.dispatch("fetchCurrent").then(() => {
      this.userLoading = false;
    });
  }
};
</script>

<style scoped></style>
