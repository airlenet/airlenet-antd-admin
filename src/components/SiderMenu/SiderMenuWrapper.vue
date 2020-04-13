<template>
  <div>
    <template v-if="mobile">
      <a-drawer :visible="!collapsed">
        <SiderMenu
          className="ant-pro-sider-menu"
          :collapsed="mobile ? false : collapsed"
          :title="title"
        />
      </a-drawer>
    </template>
    <template v-else>
      <SiderMenu className="ant-pro-sider-menu" :title="title" />
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
    hide: {},
    title: {}
  }
};
</script>
