<template>
    <a-drawer v-if="mobile && !hide"
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
    <SiderMenu v-else-if="!hide"
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

<script>
  // import {Fragment} from 'vue-fragment'
  import SiderMenu from "./SiderMenu";

  export default {
    name: "SiderMenuWrapper",
    components: {SiderMenu},
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
        default: true
      },
      title: {}
    },
    computed: {
      getFlatMenuKeys() {
        return function (menuData) {
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
