<template>
  <div>
    <ProLayout :logo="logo" />
    <SettingDrawer :setting="$store.state.setting" @onSettingChange="(payload)=>{$store.commit('changeSetting',  payload);}"/>
  </div>
</template>

<script>
import ProLayout from "./ProLayout";
import SettingDrawer from "../components/SettingDrawer/SettingDrawer";
import logo from "../assets/logo.svg";

export default {
  name: "BasicLayout",
  components: { SettingDrawer, ProLayout },
  data() {
    return{
      logo
    }
  }
};
</script>
