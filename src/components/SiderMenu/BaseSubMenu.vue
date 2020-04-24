<template>
  <Menu.SubMenu
    :key="menuInfo.key || menuInfo.path"
    v-bind="$props"
    v-on="$listeners"
    @titleClick="
      ({ key, domEvent }) => {
        this.onTitleClick(menuInfo, { key, domEvent });
      }
    "
  >
    <template slot="title" v-if="menuInfo.icon">
      <a-icon :type="menuInfo.icon" />
      <span>{{ $t(menuInfo.locale) }}</span>
    </template>
    <template slot="title" v-else>
      {{ $t(menuInfo.locale) }}
    </template>
    <template v-for="item in menuInfo.children">
      <Menu.Item v-if="!item.children" :key="item.key || item.path">
        <template v-if="item.icon">
          <a-icon :type="item.icon" />
          <span>{{ $t(item.locale) }}</span>
        </template>
        <template v-else>
          {{ $t(item.locale) }}
        </template>
      </Menu.Item>
      <base-sub-menu v-else :key="item.key || item.path" :menu-info="item" />
    </template>
  </Menu.SubMenu>
</template>

<script>
import { Menu } from "ant-design-vue";
export default {
  name: "BaseSubMenu",
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    children() {
      debugger;
      return this.parentItem.children;
    }
  },
  methods: {
    onTitleClick(item, { key, domEvent }) {
      if (item.onTitleClick && typeof item.onTitleClick === "function") {
        item.onTitleClick({ key, domEvent });
      }
    }
  }
};
</script>
