<template>
  <Fragment>
    <ProLayout :logo="logo" :onCollapse="onCollapse" />
    <SettingDrawer
      :setting="$store.state.setting"
      @onSettingChange="
        payload => {
          $store.commit('setting/changeSetting', payload);
        }
      "
    />
  </Fragment>
</template>

<script>
import ProLayout from "./ProLayout";
import SettingDrawer from "../components/SettingDrawer/SettingDrawer";
import logo from "../assets/logo.svg";
import { Fragment } from "vue-fragment";

export default {
  name: "BasicLayout",
  components: { SettingDrawer, ProLayout, Fragment },
  data() {
    return {
      logo
    };
  },
  methods: {
    onCollapse(collapsed) {
      this.$store.commit("global/changeLayoutCollapsed", collapsed);
    }
  }
};
</script>
