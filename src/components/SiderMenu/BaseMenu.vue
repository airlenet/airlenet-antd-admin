<template>
  <a-menu
    key="Menu"
    :mode="mode"
    :defaultOpenKeys="defaultOpenKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :theme="theme"
    :selectedKeys="selectedKeys"
    :style="styleStr"
    :class="[{ ['top-nav-menu']: mode === 'horizontal' }, className]"
    @openChange="setOpenKeys"
    @select="setSelects"
  >
    <template v-for="item in menuData">
      <a-menu-item v-if="!item.children" :key="item.key || item.path">
        <template v-if="item.icon">
          <a-icon :type="item.icon" />
          <span>{{ $t(item.locale) }}</span>
        </template>
        <template v-else>
          {{ $t(item.locale) }}
        </template>
      </a-menu-item>
      <base-sub-menu v-else :menu-info="item" :key="item.key || item.path" />
    </template>
  </a-menu>
</template>
<script>
import BaseSubMenu from "./BaseSubMenu";
import pathToRegexp from "path-to-regexp";
export default {
  name: "BaseMenu",
  components: {
    BaseSubMenu: BaseSubMenu
  },
  props: {
    collapsed: {},
    menuData: {},
    mode: {},
    theme: {},
    styleStr: {},
    className: {},
    flatMenuKeys: {
      type: Array,
      default: function() {
        return [];
      }
    },

    location: {}
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: []
    };
  },
  created() {
    this.selectedKeys = this.getSelectedMenuKeys(window.location.pathname);
    this.defaultSelectedKeys = [...this.selectedKeys];
    this.defaultOpenKeys = this.defaultSelectedKeys.concat([]);
    this.defaultOpenKeys.pop();
  },
  methods: {
    setOpenKeys(keys) {
      this.openKeys = keys;
    },
    //eslint-disable-next-line
    setSelects({ item, key, selectedKeys }){
      this.selectedKeys = selectedKeys;
      this.bus.$emit("onSelect", key);
    },
    getSelectedMenuKeys(pathname) {
      const { flatMenuKeys } = this.$props;
      function urlToList(url) {
        const urllist = url.split("/").filter(i => i);
        return urllist.map(
          (urlItem, index) => `/${urllist.slice(0, index + 1).join("/")}`
        );
      }
      const getMenuMatches = (flatMenuKeys, path) => {
        return flatMenuKeys.filter(item => {
          if (item) {
            return pathToRegexp(item).test(path);
          }
          return false;
        });
      };
      return urlToList(pathname).map(itemPath =>
        getMenuMatches(flatMenuKeys, itemPath).pop()
      );
    },

    conversionPath(path) {
      if (path && path.indexOf("http") === 0) {
        return path;
      }
      return `/${path || ""}`.replace(/\/+/g, "/");
    }
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
