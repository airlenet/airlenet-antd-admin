<template>
  <div v-if="!hide">
    <template v-if="mobile">
      <a-drawer
        :visible="!collapsed"
        :theme="theme"
        placement="left"
        :class="['ant-pro-drawer-sider-menu']"
        :bodyStyle="{ padding: 0, height: '100vh' }"
        width="siderWidth"
        @close="() => this.$emit('onCollapse', true)"
      >
        <SiderMenu
          className="ant-pro-sider-menu"
          :menuData="menuData"
          :title="title"
          :theme="theme"
          :collapsed="mobile ? false : collapsed"
        />
      </a-drawer>
    </template>
    <template v-else>
      <SiderMenu
        className="ant-pro-sider-menu"
        :menuData="menuData"
        :title="title"
        :theme="theme"
        :collapsed="collapsed"
      />
    </template>
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu";
export default {
  name: "SiderMenuWrapper",
  components: { SiderMenu },
  props: {
    mobile: {},
    menuData: {},
    collapsed: {},
    siderWidth: {},
    className: {},
    theme: {},
    hide: {
      default: false
    },
    title: {}
  },
  watch: {
    hide(val) {
      console.log("hide = " + val);
    }
  }
};
</script>
