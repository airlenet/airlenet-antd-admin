<template>
  <div
    :class="[
      'ant-design-pro',
      'ant-pro-basicLayout',
      {
        [`screen-${colSize}`]: colSize,
        ['ant-pro-basicLayout-topmenu']: layout === 'topmenu',
        ['ant-pro-basicLayout-is-children']: childrenLayout,
        ['ant-pro-basicLayout-fix-siderbar']: fixSiderbar,
        ['ant-pro-basicLayout-mobile']: mobile
      }
    ]"
  >
    <Layout style="minHeight:100%" :style="styleStr" hasSider>
      <SiderMenuWrapper
        v-if="hasSiderMenu"
        :mobile="mobile"
        :title="title"
        :theme="navTheme"
        :menuData="menuData"
        :collapsed="collapsed"
        :onCollapse="onCollapse"
        :siderWidth="siderWidth"
        :fixSiderbar="fixSiderbar"
        :logo="logo"
        :hide="hide"
        :layout="layout"
        @onCollapse="onCollapse"
      />
      <Layout :style="genLayoutStyle">
        <HeaderView
          :logo="logo"
          rightContent="RightContent"
          :mobile="mobile"
          :title="title"
          :hasSiderMenu="hasSiderMenu"
          :theme="navTheme"
          :layout="layout"
          :menuData="menuData"
          :siderWidth="siderWidth"
          :collapsed="collapsed"
          :onCollapse="onCollapse"
          :fixedHeader="fixedHeader"
          @onCollapse="onCollapse"
        >
          <GlobalRightContent
            slot="rightContent"
            :theme="navTheme"
            :layout="layout"
          />
        </HeaderView>
        <WrapContent
          :className="contentClassName"
          :isChildrenLayout="isChildrenLayout"
          :style="contentStyle"
        >
          <PageLoading v-if="loading" />
          <router-view v-else :contentWidth="contentWidth" />
        </WrapContent>
        <FooterView />
      </Layout>
    </Layout>
  </div>
</template>

<script>
import PageLoading from "../components/PageLoading/PageLoading";
import WrapContent from "./WrapContent";
import useMediaQuery from "@/utils/use-media-query.js";
import SiderMenuWrapper from "../components/SiderMenu/SiderMenuWrapper";
import DefaultSettings from "../config/defaultSettings.js";
import "./ProLayout.less";
import HeaderView from "../components/Header/HeaderView";
import GlobalRightContent from "../components/Header/GlobalRightContent";
import routes from "../router/routers.js";
import FooterView from "../components/Footer/FooterView";
import ResizeObserver from "resize-observer-polyfill";
import { Layout } from "ant-design-vue";
export default {
  name: "ProLayout",
  components: {
    FooterView,
    GlobalRightContent,
    HeaderView,
    SiderMenuWrapper,
    WrapContent,
    PageLoading,
    Layout
  },
  props: {
    styleStr: {},
    /**
     * 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可
     */
    disableMobile: {
      default: false
    },
    childrenLayout: {
      default: undefined
    },
    onCollapse: {
      type: Function
    },
    siderWidth: {
      default: 256
    },
    logo: {
      default:
        "https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg"
    },

    /**
     * 兼用 content的 margin
     */
    disableContentMargin: {}
  },
  data() {
    return {
      loading: false,
      colSize: "",
      mobile: false,
      title: DefaultSettings.title,
      resizeObserver: null,
      hasSiderMenu: true,
      location: { pathname: "/" }
    };
  },
  computed: {
    menuData() {
      return this.$store.state.menu.menuData;
    },
    collapsed() {
      return this.$store.state.global.collapsed;
    },
    navTheme() {
      const navTheme = this.$store.state.setting.navTheme;
      return (navTheme || "dark").toLocaleLowerCase().includes("dark")
        ? "dark"
        : "light";
    },
    hide() {
      return this.layout === "topmenu" && !this.mobile;
    },
    fixSiderbar() {
      return this.$store.state.setting.fixSiderbar;
    },
    layout() {
      return this.$store.state.setting.layout;
    },
    contentWidth() {
      return this.$store.state.setting.contentWidth;
    },
    fixedHeader() {
      return this.$store.state.setting.fixedHeader;
    },
    genLayoutStyle() {
      if (this.hide) {
        return "position: relative";
      }
      const hasLeftPadding =
        this.fixSiderbar && this.layout !== "topmenu" && !this.mobile;
      if (hasLeftPadding) {
        return "paddingLeft:" + (this.collapsed ? 80 : this.siderWidth) + "px";
      }
      return "";
    },
    contentStyle() {
      return "";
    },
    contentClassName() {
      return "ant-pro-basicLayout-content ant-pro-basicLayout-has-header " +
        this.disableContentMargin
        ? "ant-pro-basicLayout-content-disable-margin"
        : "";
    },
    isChildrenLayout() {
      return false;
    }
  },
  created() {
    this.colSize = useMediaQuery();
    this.mobile =
      (this.colSize === "sm" || this.colSize === "xs") && !this.disableMobile;
  },
  methods: {
    resize() {
      this.colSize = useMediaQuery();
      this.mobile =
        (this.colSize === "sm" || this.colSize === "xs") && !this.disableMobile;
    },
    onMenuClick(key) {
      console.log(key);
      this.$router.push({ path: key });
    }
  },
  mounted() {
    this.$store.commit("setting/getSetting");
    this.$store.dispatch("user/fetchCurrent").then(() => {});
    this.$store.dispatch("menu/getMenuData", { routes }).then(() => {});
    this.$nextTick(function() {
      this.resizeObserver = new ResizeObserver(() => {
        this.resize();
      });
      this.resizeObserver.observe(document.body);
      this.bus.$on("onSelect", this.onMenuClick);
    });
  },
  watch: {
    //eslint-disable-next-line
    $route(to, from) {
      this.location.pathname = window.location.pathname;
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(document.body);
    }
    this.resizeObserver = null;
  }
};
</script>
