<template>
  <a-layout :class="className" :style="styleStr">
    <GlobalFooter
      :links="links !== undefined ? links : defaultLinks"
      :copyright="
        copyright === false
          ? null
          : 'Copyright<CopyrightOutlined/>' + (copyright || defaultCopyright)
      "
    >
      <template slot="copyright"
        >'Copyright<CopyrightOutlined />' + (copyright ||
        defaultCopyright)</template
      >
    </GlobalFooter>
  </a-layout>
</template>

<script>
import GlobalFooter from "./GlobalFooter";
import { CopyrightOutlined } from "@ant-design/icons-vue";

export default {
  name: "DefaultFooter",
  components: { GlobalFooter, CopyrightOutlined },
  props: {
    links: {},
    copyright: {},
    styleStr: {},
    className: {}
  },
  data() {
    return {
      defaultLinks: [
        {
          key: "Ant Design Pro",
          title: "Ant Design Pro",
          href: "https://pro.ant.design",
          blankTarget: true
        },
        {
          key: "github",
          title: "< GithubOutlined / >",
          render: h => {
            return h("<GithubOutlined />");
          },
          href: "https://github.com/ant-design/ant-design-pro",
          blankTarget: true
        },
        {
          key: "Ant Design",
          title: "Ant Design",
          href: "https://ant.design",
          blankTarget: true
        }
      ],
      defaultCopyright: "2019 蚂蚁金服体验技术部出品"
    };
  }
};
</script>
