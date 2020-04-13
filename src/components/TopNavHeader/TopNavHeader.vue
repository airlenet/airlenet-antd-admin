<template>
  <div :class="{ 'ant-pro-top-nav-header': true, light: theme === 'light' }">
    <div
      :class="
        `${baseClassName}-main` + ' ' + (contentWidth === 'Fixed' ? 'wide' : '')
      "
    >
      <div :class="`${baseClassName}-left`" @click="onMenuHeaderClick">
        <div :class="`${baseClassName}-logo`" key="logo" id="logo">
          <a href="/">
            <img :src="logo" alt="logo" />
            <h1 v-if="!collapsed">{{ title }}</h1>
          </a>
        </div>
      </div>

      <div style="flex: 1" :class="`${baseClassName}-menu`">
        <!--<BaseMenu {...props} {...props.menuProps} />-->
      </div>
      <!--{rightContentRender && (-->
      <!--<RightContent rightContentRender={rightContentRender} {...props} />-->
      <!--)}-->
    </div>
  </div>
</template>

<script>
import "./TopNavHeader.less";
export default {
  name: "TopNavHeader",
  props: {
    contentWidth: {},
    collapsed: {},
    theme: {},
    logo: {}
  },
  data() {
    return {
      baseClassName: "ant-pro-top-nav-header"
    };
  },
  methods: {
    onMenuHeaderClick() {}
  }
};
</script>
