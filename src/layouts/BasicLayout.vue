<template>
  <div>
    <ProLayout />
    <SettingDrawer :setting="$store.state.setting" />
  </div>
</template>

<script>
import ProLayout from "./ProLayout";
import SettingDrawer from "../components/SettingDrawer/SettingDrawer";
export default {
  name: "BasicLayout",
  components: { SettingDrawer, ProLayout }
};
</script>
