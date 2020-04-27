<template>
  <div :class="className">
    <div :class="className + '-title'">{{ headerTitle }}</div>
    <div :class="`${className}-option`">
      <Space>
        <slot name="toolBarRender" />
        <!--{actions-->
        <!--.filter((item) => item)-->
        <!--.map((node, index) => (-->
        <!--<div-->
        <!--// eslint-disable-next-line react/no-array-index-key-->
        <!--key={index}-->
        <!--&gt;-->
        <!--{node}-->
        <!--</div>-->
        <!--))}-->
      </Space>
      <div :class="`${className}-default-option`">
        <a-divider
          type="vertical"
          v-if="
            options.fullScreen ||
              options.reload ||
              options.setting ||
              options.density
          "
        />
        <Space>
          <span class="ant-pro-table-toolbar-item-icon">
            <a-tooltip title="表格密度" v-if="options.density">
              <DensityIcon />
            </a-tooltip>
          </span>
          <span class="ant-pro-table-toolbar-item-icon">
            <a-tooltip title="全屏" v-if="options.fullScreen">
              <FullScreenIcon />
            </a-tooltip>
          </span>
          <span class="ant-pro-table-toolbar-item-icon">
            <a-tooltip title="刷新" v-if="options.reload">
              <ReloadOutlined />
            </a-tooltip>
          </span>
          <span class="ant-pro-table-toolbar-item-icon">
            <a-tooltip title="列设置" v-if="options.setting">
              <SettingOutlined />
            </a-tooltip>
          </span>
        </Space>
      </div>
    </div>
  </div>
</template>

<script>
import Space from "../../Space/Space";
import "./Toobar.less";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons-vue";
import FullScreenIcon from "./FullScreenIcon";
import DensityIcon from "./DensityIcon";

export default {
  name: "Toolbar",
  components: {
    DensityIcon,
    FullScreenIcon,
    Space,
    ReloadOutlined,
    SettingOutlined
  },
  props: {
    headerTitle: {},
    action: {
      type: Function
    },
    options: {
      default: function() {
        return {
          density: true,
          fullScreen: () => this.action.fullScreen && this.action.fullScreen(),
          reload: () => this.action.reload(),
          setting: true
        };
      }
    }
  },
  data() {
    return {
      className: "ant-pro-table-toolbar"
    };
  }
};
</script>
