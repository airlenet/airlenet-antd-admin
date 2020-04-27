<template>
  <a-dropdown>
    <a-tooltip title="表格密度">
      <ColumnHeightOutlined />
    </a-tooltip>
  </a-dropdown>
</template>

<script>
import { ColumnHeightOutlined } from "@ant-design/icons-vue";

export default {
  name: "DensityIcon",
  components: { ColumnHeightOutlined }
};
</script>
