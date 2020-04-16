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
          :flatMenuKeys="getFlatMenuKeys(menuData)"
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
        :flatMenuKeys="getFlatMenuKeys(menuData)"
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
    fixSiderbar: {},
    className: {},
    theme: {},
    hide: {
      default: false
    },
    title: {}
  },
  computed: {
    getFlatMenuKeys() {
      return function(menuData) {
        let keys = [];
        menuData.forEach(item => {
          keys.push(item.path);
          if (item.children) {
            keys = keys.concat(this.getFlatMenuKeys(item.children));
          }
        });
        return keys;
      };
    }
  },
  watch: {
    hide(val) {
      console.log("hide = " + val);
    }
  }
};
</script>
