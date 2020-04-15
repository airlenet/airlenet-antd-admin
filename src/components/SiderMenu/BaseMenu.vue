<!--<template>-->
<!--<a-menu-->
<!--key="Menu"-->
<!--:mode="mode"-->
<!--:defaultOpenKeys="[]"-->
<!--:theme="theme"-->
<!--:selectedKeys="selectedKeys"-->
<!--:style="styleStr"-->
<!--:class="[{ ['top-nav-menu']: mode === 'horizontal' }, className]"-->
<!--@onOpenChange="setOpenKeys"-->
<!--&gt;-->
<!--<template v-for="item in menuData">-->
<!--&lt;!&ndash;<SubMenuItem&ndash;&gt;-->
<!--&lt;!&ndash;v-if="&ndash;&gt;-->
<!--&lt;!&ndash;Array.isArray(item.children) &&&ndash;&gt;-->
<!--&lt;!&ndash;!item.hideChildrenInMenu &&&ndash;&gt;-->
<!--&lt;!&ndash;item.children.some(child => child && !!child.name)&ndash;&gt;-->
<!--&lt;!&ndash;"&ndash;&gt;-->
<!--&lt;!&ndash;:parentItem="item"&ndash;&gt;-->
<!--&lt;!&ndash;:parentMenu="$refs.Menu"&ndash;&gt;-->
<!--&lt;!&ndash;/>&ndash;&gt;-->
<!--<a-sub-menu   v-if="-->
<!--Array.isArray(item.children) &&-->
<!--!item.hideChildrenInMenu &&-->
<!--item.children.some(child => child && !!child.name)-->
<!--" :key="item.key">-->
<!--<span slot="title"-->
<!--&gt;<a-icon :type="item.icon" /><span>{{ item.name }}</span></span-->
<!--&gt;-->

<!--&lt;!&ndash;<template v-for="item in children">&ndash;&gt;-->
<!--&lt;!&ndash;<SubMenuItem&ndash;&gt;-->
<!--&lt;!&ndash;v-if="&ndash;&gt;-->
<!--&lt;!&ndash;Array.isArray(item.children)&ndash;&gt;-->
<!--&lt;!&ndash;"&ndash;&gt;-->
<!--&lt;!&ndash;title="{title}"&ndash;&gt;-->
<!--&lt;!&ndash;:key="item.key || item.path"&ndash;&gt;-->
<!--&lt;!&ndash;onTitleClick="{item.onTitleClick}"&ndash;&gt;-->
<!--&lt;!&ndash;:parentItem="item"&ndash;&gt;-->
<!--&lt;!&ndash;/>&ndash;&gt;-->
<!--&lt;!&ndash;<a-menu-item   :key="item.key || item.path">&ndash;&gt;-->
<!--&lt;!&ndash;<a-icon :type="item.icon" />&ndash;&gt;-->
<!--&lt;!&ndash;<span>{{ item.name }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;</a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->
<!--</a-sub-menu>-->
<!--<a-menu-item  v-else :key="item.key || item.path">-->
<!--<a-icon :type="item.icon" />-->
<!--<span>{{ item.name }}</span>-->
<!--</a-menu-item>-->
<!--</template>-->
<!--</a-menu>-->
<!--</template>-->

<script>
import SubMenuItem from "./SubMenuItem";
export default {
  name: "BaseMenu",
  components: { SubMenuItem },
  props: {
    collapsed: {},
    menuData: {},
    mode: {},
    theme: {},
    styleStr: {},
    className: {}
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: []
    };
  },
  methods: {
    setOpenKeys(keys) {
      this.openKeys = keys;
    },
    getSubMenuOrItem(h, item) {
      const defaultTitle = item.icon
        ? h("span", {}, [
            h("a-icon", { props: { type: item.icon } }),
            h("span", [this.$t(item.locale)])
          ])
        : h(this.$t(item.locale));
      if (
        Array.isArray(item.children) &&
        !item.hideChildrenInMenu &&
        item.children.some(child => child && !!child.name)
      ) {
        return h(
          "a-sub-menu",
          { props: { key: item.key || item.path, title: defaultTitle } },
          this.getNavMenuItems(h, item.children)
        );
      } else {
        return h("a-menu-item", [h("span", [defaultTitle])]);
      }
    },
    getNavMenuItems(h, menuData) {
      const navMenuItems = menuData.map(item => this.getSubMenuOrItem(h, item));
      return navMenuItems;
    }
  },
  render: function() {
    var h = arguments[0];
    const navMenuItems = this.getNavMenuItems(h, this.menuData);

    return h(
      "a-menu",
      { props: { key: "Menu", mode: this.mode, theme: this.theme } },
      navMenuItems
    );
  }
};
</script>
