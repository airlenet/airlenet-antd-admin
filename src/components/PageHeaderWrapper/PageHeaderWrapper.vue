<template>
  <div :style="styleStr" :class="[prefixedClassName, className]">
    <div :class="`${prefixedClassName}-page-header-warp`">
      <GridContent :contentWidth="contentWidth">
        <a-page-header :title="title">
          <!-- content -->
          <div
            v-if="
              content || extraContent || $slots.content || $slots.extraContent
            "
            :class="`${prefixedClassName}-detail`"
          >
            <div :class="`${prefixedClassName}-main`">
              <div :class="`${prefixedClassName}-row`">
                <div
                  v-if="content || $slots.content"
                  :class="`${prefixedClassName}-content`"
                >
                  <slot name="content">
                    {{ content }}
                  </slot>
                </div>
                <div
                  v-if="extraContent || $slots.extraContent"
                  :class="`${prefixedClassName}-extraContent`"
                >
                  <slot name="extraContent">
                    {{ extraContent }}
                  </slot>
                </div>
              </div>
            </div>
          </div>
          <a-tabs
            :activeKey="tabActiveKey"
            v-if="tabList && tabList.length > 0"
            slot="footer"
            @change="
              key => {
                if (this.onTabChange) this.onTabChange(key);
              }
            "
          >
            <a-tab-pane
              v-for="item in tabList"
              :tab="item.tab"
              :key="item.key"
            />
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
    tabActiveKey: {},
    contentWidth: {},
    extraContent: {},
    onTabChange: {}
  },
  data() {
    return {
      prefixedClassName,
      styles
    };
  },
  mounted() {
    console.log(this.tabList);
  }
};
</script>
