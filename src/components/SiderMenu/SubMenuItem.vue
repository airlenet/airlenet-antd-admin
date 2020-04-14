<template>
  <a-sub-menu :key="parentItem.key" :parentMenu="parentMenu">
    <span slot="title"
      ><a-icon :type="parentItem.icon" /><span>{{
        parentItem.name
      }}</span></span
    >
    <a-menu-item key="1">Option 1</a-menu-item>
    <!--<template v-for="item in children">-->
    <!--<SubMenuItem-->
    <!--v-if="-->
    <!--Array.isArray(item.children)-->
    <!--"-->
    <!--title="{title}"-->
    <!--:key="item.key || item.path"-->
    <!--onTitleClick="{item.onTitleClick}"-->
    <!--:parentItem="item"-->
    <!--/>-->
    <!--<a-menu-item   :key="item.key || item.path">-->
    <!--<a-icon :type="item.icon" />-->
    <!--<span>{{ item.name }}</span>-->
    <!--</a-menu-item>-->
    <!--</template>-->
  </a-sub-menu>
</template>

<script>
export default {
  name: "SubMenuItem",
  props: {
    parentItem: {},
    parentMenu: {}
  },
  computed: {
    children() {
      debugger;
      return this.parentItem.children;
    }
  }
};
</script>
