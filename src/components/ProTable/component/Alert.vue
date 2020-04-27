<template>
  <div :class="className">
    <a-alert type="info" showIcon>
      <div slot="message" :class="`${className}-info`">
        <div :class="`${className}-info-content`">
          <Space>
            <slot name="alertInfoRender">
              <!--已选择-->
              <!--<a :style="{ fontWeight: 600 }">{{selectedRowKeys.length}}</a>-->
              <!--项&nbsp;&nbsp;-->
            </slot>
          </Space>
        </div>
        <div :class="`${className}-info-option`">
          <slot name="alertOptionRender">
            <a @click="onCleanSelected" key="0">
              清空
            </a>
          </slot>
        </div>
      </div>
    </a-alert>
  </div>
</template>

<script>
import Space from "../../Space/Space";
import "./Alert.less";

export default {
  name: "Alert",
  components: { Space },
  props: {
    selectedRowKeys: {
      default: function() {
        return [];
      }
    },
    onCleanSelected: {
      type: Function,
      default: function() {
        return function() {};
      }
    }
    // alertInfoRender: {
    //   type: Function
    // }
  },
  data() {
    return {
      className: "ant-pro-table-alert"
    };
  },
  mounted() {
    // debugger
  }
};
</script>
