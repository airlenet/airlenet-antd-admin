<template>
  <HeaderDropdown
    placement="bottomRight"
    :overlayClassName="styles.popover"
    :visible="visible"
    :trigger="['click']"
    @onVisibleChange="setVisible"
  >
    <span :class="[{ [styles.noticeButton]: true }, className]">
      <a-badge
        :count="count"
        style="box-shadow:none"
        :class="{ [styles.badge]: true }"
      >
        <BellOutlined :class="{ [styles.icon]: true }" />
      </a-badge>
    </span>

    <a-spin slot="overlay" :spinning="loading" :delay="300">
      <a-tabs
        :class="{ [styles.tabs]: true }"
        @onChange="
          {
            onTabChange;
          }
        "
      >
        <template v-for="slot in $slots.default">
          <a-tab-pane
            :tab="
              slot.componentOptions.propsData.count
                ? slot.componentOptions.propsData.title +
                  '(' +
                  slot.componentOptions.propsData.count +
                  ')'
                : slot.componentOptions.propsData.title
            "
            :key="slot.componentOptions.propsData.tabKey"
          >
            <!--<slot :name="slot"></slot>-->

            <NoticeIconTab
              :tabKey="slot.componentOptions.propsData.tabKey"
              :title="slot.componentOptions.propsData.title"
              :emptyText="slot.componentOptions.propsData.emptyText"
              :showViewMore="slot.componentOptions.propsData.showViewMore"
              :clearText="clearText"
              :viewMoreText="viewMoreText"
              :data="slot.data.attrs.list"
            />
          </a-tab-pane>
        </template>
      </a-tabs>
    </a-spin>
  </HeaderDropdown>
</template>

<script>
import { BellOutlined } from "@ant-design/icons-vue";
import styles from "./NoticeIcon.module.less";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import NoticeIconTab from "./NoticeIconTab";
export default {
  name: "NoticeIcon",
  props: {
    clearText: {},
    viewMoreText: {},
    showViewMore: {},
    count: {},
    className: {},
    loading: {}
  },
  components: {
    NoticeIconTab,
    HeaderDropdown,
    BellOutlined
  },
  data() {
    return {
      styles,
      visible: false
    };
  },
  methods: {
    onTabChange() {
      this.visible = true;
    },
    setVisible(visible) {
      this.visible = visible;
    }
  }
};
</script>
