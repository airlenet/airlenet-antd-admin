<template>
  <div v-if="!hide">
    <template v-if="mobile">
      <a-drawer
        :visible="!collapsed"
        :theme="theme"
        placement="left"
        :class="['ant-pro-drawer-sider-menu']"
        :bodyStyle="{ padding: 0, height: '100vh' }"
        :width="siderWidth"
        @close="() => this.$emit('onCollapse', true)"
      >
        <SiderMenu
          className="ant-pro-sider-menu"
          :menuData="menuData"
          :title="title"
          :theme="theme"
          :logo="logo"
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
        :fixSiderbar="fixSiderbar"
        :logo="logo"
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
    logo: {},
    mobile: {},
    menuData: {},
    collapsed: {},
    siderWidth: {},
    fixSiderbar:{},
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
