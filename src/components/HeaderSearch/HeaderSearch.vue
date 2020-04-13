<template>
  <div
    :class="[{ [styles.headerSearch]: true }, className]"
    @click="
      () => {
        setSearchMode(true);

        // if (searchMode && inputRef.current) {
        // inputRef.current.focus();
        // }
      }
    "
    @transitionend="
      ({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          vm.$emit('onVisibleChange', searchMode);
        }
      }
    "
    @webkitTransitionend="
      ({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          vm.$emit('onVisibleChange', searchMode);
        }
      }
    "
  >
    <SearchOutlined
      key="Icon"
      style="
            cursor: pointer"
    />
    <a-auto-complete
      key="AutoComplete"
      :class="{ [styles.input]: true, [styles.show]: searchMode }"
      :value="value"
      style="
            height: 28px; marginTop: -6px;
            "
      :dataSource="options"
      @change="setValue"
    >
      <a-input
        ref="inputRef"
        :defaultValue="defaultValue"
        :aria-label="placeholder"
        :placeholder="placeholder"
        @onKeyDown="
          e => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }
        "
        @onBlur="
          () => {
            setSearchMode(false);
          }
        "
      />
    </a-auto-complete>
  </div>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";
import styles from "./HeaderSearch.module.less";
export default {
  name: "HeaderSearch",
  components: {
    SearchOutlined
  },
  props: {
    options: {},
    className: {},
    defaultValue: {},
    placeholder: {},
    defaultOpen: {}
  },
  data() {
    return {
      styles,
      searchMode: false,
      value: null
    };
  },
  methods: {
    setSearchMode(visible) {
      this.searchMode = visible;
    },
    setValue(value) {
      this.value = value;
    }
  }
};
</script>
