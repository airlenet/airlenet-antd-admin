<template>
  <div>
    <div>
      <a-form>
        <a-row :gutter="16" justify="start">
          <a-col>
            <a-form-item> </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "FormSearch",
  components: { AFormItem }
};
</script>

<style scoped></style>
