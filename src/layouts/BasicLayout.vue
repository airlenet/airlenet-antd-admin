<template>
  <div class="ant-design-pro ant-pro-basicLayout screen-xl">
    <a-layout style="minHeight:100%" :style="styleStr" hasSider>
      <SiderMenuWrapper :mobile="mobile" :title="title" />
      <a-layout :style="genLayoutStyle">
        <Header :logo="logo" rightContent="RightContent">
          <GlobalRightContent slot="rightContent" />
        </Header>
        <WrapContent
          :className="contentClassName"
          :isChildrenLayout="isChildrenLayout"
          :style="contentStyle"
        >
          <PageLoading v-if="loading" />
          <router-view v-else />
        </WrapContent>
        <!--{footerDom}-->
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
import Header from "../components/Header/Header";
import logo from "../assets/logo.svg";
import GlobalRightContent from "../components/Header/GlobalRightContent";
export default {
  name: "BasicLayout",
  components: {
    GlobalRightContent,
    Header,
    SiderMenuWrapper,
    WrapContent,
    PageLoading
  },
  props: {
    styleStr: {},
    disableMobile: {
      default: false
    }
  },
  data() {
    return {
      loading: false,
      colSize: "",
      mobile: false,
      title: DefaultSettings.title,
      logo: logo
    };
  },
  computed: {
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
      (this.colSize === "sm" || this.colSize === "xs") && this.disableMobile;
  }
};
</script>
