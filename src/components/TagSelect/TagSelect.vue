<template>
  <div :class="cls" :style="styleName">
    <a-checkable-tag
      v-if="!hideCheckAll"
      :checked="checkedAll"
      key="tag-select-__all__"
      @change="onSelectAll"
    >
      {{ selectAllText }}
    </a-checkable-tag>

    <slot></slot>
    <a v-if="expandable" :class="[styles.trigger]" @click="handleExpand">
      <template v-if="expand">
        {{ collapseText }}
        <UpOutlined />
      </template>
      <template v-else>
        {{ expandText }}
        <DownOutlined />
      </template>
    </a>
  </div>
</template>

<script>
import styles from "./index.module.less";
import { findComponentsDownward } from "@/utils/assist";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

export default {
  name: "TagSelect",
  components: {
    DownOutlined,
    UpOutlined
  },
  inheritAttrs: false,
  props: {
    className: String,
    styleName: String,
    hideCheckAll: Boolean,
    defaultValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    actionsText: {
      type: Object,
      default: function() {
        return {
          expandText: "展开",
          collapseText: "收起",
          selectAllText: "全部"
        };
      }
    },
    expandable: Boolean
  },
  data() {
    return {
      ...this.actionsText,
      styles,
      currentValue:
        this.$attrs["value"] == undefined
          ? (this.$attrs['data-__meta'].initialValue==undefined?this.defaultValue:this.$attrs['data-__meta'].initialValue)
          : this.$attrs["value"],
      expand: false
    };
  },

  computed: {
    cls() {
      return [
        styles.tagSelect,
        this.className,
        {
          [styles.hasExpandTag]: this.expandable,
          [styles.expanded]: this.expand
        }
      ];
    },
    checkedAll() {
      return this.currentValue.length == 0
        ? false
        : this.getAllTags().length == this.currentValue.length;
    }
  },
  methods: {
    getAllTags() {
      this.childrens = findComponentsDownward(this, "TagSelectOption");
      const checkedTags = this.childrens
        .filter(child => child.isTagSelectOption)
        .map(child => child.value);
      return checkedTags;
    },
    onSelectAll(checked) {
      let checkedTags = [];

      if (checked) {
        checkedTags = this.getAllTags();
      }
      this.onChange(checkedTags);
    },
    handleTagChange({ value, checked }) {
      const checkedTags = [...this.currentValue];
      const index = checkedTags.indexOf(value);

      if (checked && index === -1) {
        checkedTags.push(value);
      } else if (!checked && index > -1) {
        checkedTags.splice(index, 1);
      }
      this.onChange(checkedTags);
    },
    onChange(value) {
      this.currentValue = value;
      this.updateValue();
      if(this.$listeners['change.value']){
        this.$emit("change.value", value);
      }
      if(this.$listeners['change']){
        this.$listeners['change'](value)
      }
      if(this.$listeners['input']){
        this.$listeners['input'](value)
      }
    },
    handleExpand() {
      this.expand = !this.expand;
    },
    updateValue() {
      this.childrens = findComponentsDownward(this, "TagSelectOption");
      if (this.childrens) {
        this.childrens.forEach(child => {
          child.currentChecked = this.currentValue.indexOf(child.value) > -1;
        });
      }
    }
  },
  mounted() {
    this.updateValue();
  },
  watch: {
    value() {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value;
        this.$nextTick(() => {
          this.updateValue();
        });
      }
    }
  }
};
</script>
