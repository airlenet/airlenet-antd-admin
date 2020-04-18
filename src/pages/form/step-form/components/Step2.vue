<template>
  <a-form-model v-bind="formItemLayout" layout="horizontal"   :class="{[styles.stepForm]:true}">
    <a-alert
      closable
      showIcon
      message="确认转账后，资金将直接打入对方账户，无法退回。"
      :style="{
        marginBottom: '24px',
        }"
    />
    <a-descriptions :column="1">
      <a-descriptions-item label="付款账户"> {{form.payAccount}}</a-descriptions-item>
      <a-descriptions-item label="收款账户"> {{form.receiverAccount}}</a-descriptions-item>
      <a-descriptions-item label="收款人姓名"> {{form.receiverName}}</a-descriptions-item>
      <a-descriptions-item label="转账金额">
        <a-statistic :value="form.amount" suffix="元"/>
      </a-descriptions-item>
    </a-descriptions>
    <a-divider
      :style="{
        margin: '24px 0',}
      "
    />
    <a-form-model-item
      label="支付密码"
      props="password"
      :required="false"
      :rules="[
        {
        required: true,
        message: '需要支付密码才能进行支付',
      },
      ]"
    >
      <a-input
        type="password"
        autoComplete="off"
        :style="{
        width: '80%',
      }"
      />
    </a-form-model-item>
    <a-form-model-item
      :style="{
        marginBottom: '8px',
        }"
      :wrapperCol="{
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: formItemLayout.wrapperCol.span,
        offset: formItemLayout.labelCol.span,
        },
        }"
    >
      <a-button type="primary" @click="onValidateForm" :loading="submitting">
        提交
      </a-button>
      <a-button
        @click="onPrev"
        :style="{
          marginLeft: '8px'
          }"
      >
        上一步
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  import styles from "./Step2.module.less"
  export default {
    name: "Step2",
    data() {
      return {
        styles,
        formItemLayout: {
          labelCol: {
            span: 5,
          },
          wrapperCol: {
            span: 19,
          },
        }, form: {
          password:'123456'
        },
      }
    },
    computed: {
      submitting() {
        return this.$store.state.loading.effects['formAndstepForm/submitStepForm']
      },
      data() {
        return this.$store.state['formAndstepForm'].step
      }
    },
    methods: {
      onPrev() {
        this.$store.commit({
          type: 'formAndstepForm/saveStepFormData',
          payload: {...this.data, ...this.form},
        });
        this.$store.commit({
          type: 'formAndstepForm/saveCurrentStep',
          payload: 'info',
        });
      },
      onValidateForm() {
        this.$store.dispatch({
          type: 'formAndstepForm/submitStepForm',
          payload: { ...this.data, ...this.form },
        });
      }
    },
    mounted() {
      this.form = this.$store.state['formAndstepForm'].step
    }
  }
</script>