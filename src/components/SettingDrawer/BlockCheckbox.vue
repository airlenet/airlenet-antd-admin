<template>
  <div :class="baseClassName" :key="value">
    <template v-for="item in list">
      <a-tooltip :title="item.title" :key="item.key">
        <div
          :class="[`${baseClassName}-item`]"
          @click="() => $emit('onChange', item.key)"
        >
          <img :src="item.url" :alt="item.key" />
          <div
            :class="[`${baseClassName}-selectIcon`]"
            :style="{ display: value === item.key ? 'block' : 'none' }"
          >
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script>
import { CheckOutlined } from "@ant-design/icons-vue";
export default {
  name: "BlockCheckbox",
  components: {
    CheckOutlined
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {}
  },
  data() {
    return {
      baseClassName: "ant-pro-setting-drawer-block-checbox"
    };
  }
};
</script>
