<template>
  <div class="ant-design-pro ant-pro-basicLayout screen-xl">
    <a-layout style="minHeight:100%" :style="styleStr" hasSider>
      <SiderMenuWrapper
        :mobile="mobile"
        :title="title"
        :theme="navTheme"
        :menuData="menuData"
        :collapsed="collapsed"
        @onCollapse="() => (this.collapsed = !this.collapsed)"
      />
      <a-layout :style="genLayoutStyle">
        <HeaderView
          :logo="logo"
          rightContent="RightContent"
          :mobile="mobile"
          :collapsed="collapsed"
          @onCollapse="() => (this.collapsed = !this.collapsed)"
        >
          <GlobalRightContent slot="rightContent" />
        </HeaderView>
        <WrapContent
          :className="contentClassName"
          :isChildrenLayout="isChildrenLayout"
          :style="contentStyle"
        >
          <PageLoading v-if="loading" />
          <router-view v-else />
        </WrapContent>
        <FooterView />
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import PageLoading from "../components/PageLoading/PageLoading";
import WrapContent from "./WrapContent";
import useMediaQuery from "@/utils/use-media-query.js";
import SiderMenuWrapper from "../components/SiderMenu/SiderMenuWrapper";
import DefaultSettings from "../config/defaultSettings.js";
import "./BasicLayout.less";
import HeaderView from "../components/Header/HeaderView";
import logo from "../assets/logo.svg";
import GlobalRightContent from "../components/Header/GlobalRightContent";
import routes from "../router/routers.js";
import FooterView from "../components/Footer/FooterView";
export default {
  name: "BasicLayout",
  components: {
    FooterView,
    GlobalRightContent,
    HeaderView,
    SiderMenuWrapper,
    WrapContent,
    PageLoading
  },
  props: {
    styleStr: {},
    /**
     * 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可
     */
    disableMobile: {
      default: false
    }
  },
  data() {
    return {
      loading: false,
      colSize: "",
      collapsed: false,
      mobile: false,
      title: DefaultSettings.title,
      navTheme: DefaultSettings.navTheme,
      logo: logo
    };
  },
  computed: {
    menuData() {
      return this.$store.state.menu.menuData;
    },
    genLayoutStyle() {
      return "";
    },
    contentStyle() {
      return "";
    },
    contentClassName() {
      return "";
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
  mounted() {
    this.$store.dispatch("getMenuData", { routes }).then(() => {});
  }
};
</script>
