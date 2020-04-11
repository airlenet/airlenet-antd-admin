<template>
  <footer :class="clsString" :style="style1">
    <div v-if="links" class="ant-pro-global-footer-links">
      <a
        v-for="link in links"
        :key="link.key"
        :title="link.key"
        :target="link.blankTarget ? '_blank' : '_self'"
        :href="link.href"
      >
        {{ link.title }}
      </a>
    </div>
    <div
      v-if="copyright"
      class="ant-pro-global-footer-copyright"
      v-html="copyright"
    >
      {copyright}
    </div>
  </footer>
</template>

<script>
import "./GlobalFooter.less";

export default {
  name: "GlobalFooter",
  props: {
    links: {},
    copyright: {},
    className: {},
    styleStr: {}
  },
  computed: {
    clsString() {
      return "ant-pro-global-footer " + this.className;
    },
    style1() {
      return this.styleStr;
    }
  }
};
</script>
