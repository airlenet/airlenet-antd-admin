<template>
  <HeaderDropdown
    placement="bottomRight"
    :overlayClassName="styles.popover"
    :visible="visible"
    :trigger="['click']"
    @onVisibleChange="setVisible"
    v-if="$slots.default.length > 0"
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
    <div slot="overlay">
    <a-spin :spinning="loading" :delay="300">
      <a-tabs
        :class="{ [styles.tabs]: true }"
        @change="
          activeKey => {
            this.visible = true;
            this.onTabChange && this.onTabChange(activeKey);
          }
        "
      >
        <template v-for="slot in $slots.default">
          <a-tab-pane
            :tab="
              slot.data.attrs.count
                ? slot.componentOptions.propsData.title +
                  '(' +
                  slot.data.attrs.count +
                  ')'
                : slot.componentOptions.propsData.title
            "
            :key="slot.componentOptions.propsData.tabKey"
          >
            <SlotProps
              :slots="[slot]"
              :propsData="{
                clearText: clearText,
                viewMoreText: viewMoreText,
                onClear: () =>
                  onClear &&
                  onClear(
                    slot.componentOptions.propsData.title,
                    slot.componentOptions.propsData.tabKey
                  ),
                onClick: item =>
                  onItemClick &&
                  onItemClick(item, slot.componentOptions.propsData),
                onViewMore: event =>
                  onViewMore &&
                  onViewMore(slot.componentOptions.propsData, event),
                data: slot.data.attrs.list
              }"
            />
          </a-tab-pane>
        </template>
      </a-tabs>
    </a-spin></div>
  </HeaderDropdown>
  <span v-else :class="[{ [styles.noticeButton]: true }, className]">
    <a-badge
      :count="count"
      style="box-shadow:none"
      :class="{ [styles.badge]: true }"
    >
      <BellOutlined :class="{ [styles.icon]: true }" />
    </a-badge>
  </span>
</template>

<script>
import { BellOutlined } from "@ant-design/icons-vue";
import styles from "./NoticeIcon.module.less";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import SlotProps from "../SlotProps/SlotProps";
export default {
  name: "NoticeIcon",
  props: {
    clearText: {},
    viewMoreText: {},
    showViewMore: {},
    count: {},
    className: {},
    loading: {
      type: Boolean
    },
    onClear: {
      type: Function
    },
    onItemClick: {
      type: Function
    },
    onViewMore: {
      type: Function
    },
    onPopupVisibleChange: {
      type: Function
    },
    onTabChange: {
      type: Function
    }
  },
  components: {
    SlotProps,
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
    setVisible(visible) {
      this.visible = visible;
      if (this.onPopupVisibleChange) {
        this.onPopupVisibleChange(visible);
      }
    }
  }
};
</script>
