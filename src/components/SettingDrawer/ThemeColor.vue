<template>
  <div class="theme-color" ref="{ref}">
    <h3 class="theme-color-title">{{title}}</h3>
    <div class="theme-color-content">
      <a-tooltip
        v-for="(item) in colors"
        :key="item.color"
        :title=" genThemeToString(item.key) ? $t('app.setting.themecolor.' + genThemeToString(item.key)) : item.key "
      >
        <div  class="theme-color-block" :style="{backgroundColor:item.color}" @click="() => $emit('onChange', item.key)" >
          <CheckOutlined v-if="value === item.key || genThemeToString(value) === item.key" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { CheckOutlined } from "@ant-design/icons-vue";
import './ThemeColor.less'
export default {
  name: "ThemeColor",
  components: {
    CheckOutlined
  },
  props: {
    title: {},
    colors: {},
    value:{}
  },
  data() {
    return {
      themeConfig: {
        daybreak: "daybreak",
        "#1890ff": "daybreak",
        "#F5222D": "dust",
        "#FA541C": "volcano",
        "#FAAD14": "sunset",
        "#13C2C2": "cyan",
        "#52C41A": "green",
        "#2F54EB": "geekblue",
        "#722ED1": "purple"
      }
    };
  },
  methods: {
    genThemeToString(val) {
      return val && this.themeConfig[val] ? this.themeConfig[val] : val;
    }
  },mounted(){

  }
};
</script>
