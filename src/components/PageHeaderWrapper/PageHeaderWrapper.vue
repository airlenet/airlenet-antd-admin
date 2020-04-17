<template>
  <div :style="styleStr" :class="[prefixedClassName, className]">
    <div :class="`${prefixedClassName}-page-header-warp`">
      <GridContent :contentWidth="contentWidth">
        <a-page-header :title="title">
          <!-- content -->
          <div
            v-if="content || extraContent"
            :class="`${prefixedClassName}-detail`"
          >
            <div :class="`${prefixedClassName}-main`">
              <div :class="`${prefixedClassName}-row`">
                <div v-if="content" :class="`${prefixedClassName}-content`">
                  {{ content }}
                </div>
                <div
                  v-if="extraContent"
                  :class="`${prefixedClassName}-extraContent`"
                >
                  {{ extraContent }}
                </div>
              </div>
            </div>
          </div>
          <a-tabs v-if="tabList && tabList.length > 0" slot="footer">
            <a-tabs-tabpane />
          </a-tabs>
        </a-page-header>
      </GridContent>
    </div>

    <GridContent v-if="$slots.default">
      <div :class="`${prefixedClassName}-children-content`">
        <slot />
      </div>
    </GridContent>
  </div>
</template>

<script>
import GridContent from "../GridContent/GridContent";
const prefixedClassName = "ant-pro-page-header-wrap";
import styles from "./index.less";
export default {
  name: "PageHeaderWrapper",
  components: { GridContent },
  props: {
    styleStr: {},
    className: {},
    title: {},
    content: {},
    tabList: {},
    contentWidth: {},
    extraContent: {}
  },
  data() {
    return {
      prefixedClassName,
      styles
    };
  }
};
</script>
