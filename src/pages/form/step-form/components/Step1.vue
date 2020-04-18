<template>
  <div>
    <a-form-model  ref="form" layout="horizontal" :hideRequiredMark="true" :model="form" :class="{[styles.stepForm]:true}" v-bind="formItemLayout">
      <a-form-model-item
        label="付款账户"

        prop="payAccount"
        :rules="[ {  required: true, message: '请选择付款账户', }, ]"
      >
        <a-select v-model="form.payAccount" placeholder="test@example.com">
          <a-select-option value="ant-design@alipay.com">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="收款账户"    prop="receiverAccount"
                   :rules="[
              {
              required: true,
              message: '请输入收款人账户',
            },
            {
            type: 'email',
            message: '账户名应为邮箱格式',
            },
            ]">
        <a-input  v-model="form.receiverAccount"

          placeholder="test@example.com" >
          <a-select
            slot="addonBefore"
            defaultValue="alipay"
            :style="{
              width: '100px',
              }"
          >
            <a-select-option value="alipay">支付宝</a-select-option>
            <a-select-option value="bank">银行账户</a-select-option>
          </a-select>

        </a-input>
      </a-form-model-item>

      <a-form-model-item
        label="收款人姓名"
        prop="receiverName"
        :rules="[
        {
        required: true,
        message: '请输入收款人姓名',
      },
      ]"
      >
      <a-input v-model="form.receiverName" placeholder="请输入收款人姓名" />
      </a-form-model-item>
      <a-form-model-item
        label="转账金额"

        prop="amount"
        :rules="[
        {
        required: true,
        message: '请输入转账金额',
      },
      {
      pattern: /^(\d+)((?:\.\d+)?)$/,
      message: '请输入合法金额数字',
      },
      ]"
      >
      <a-input v-model="form.amount" prefix="￥" placeholder="请输入金额" />
      </a-form-model-item>
      <a-form-model-item
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
        <a-button type="primary" @click="onValidateForm('form')">
          下一步
        </a-button>
      </a-form-model-item>

    </a-form-model>
    <a-divider  :style="{
                margin: '40px 0 24px',
    }"
    />
    <div :class="{[styles.desc]:true}">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
      <h4>转账到银行卡</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
    </div>
  </div>
</template>

<script>
  import styles from './Step1.module.less'

  export default {
    name: "Step1",
    data() {
      return {

        styles,
        form: {
          payAccount: '',
          receiverAccount: '',
        },
        formItemLayout:{
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        }
      }
    },
    methods: {
      onValidateForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit({
              type: 'formAndstepForm/saveStepFormData',
              payload: this.form,
            });
            this.$store.commit({
              type: 'formAndstepForm/saveCurrentStep',
              payload: 'confirm',
            });
          }
        });
      }
    },
    mounted(){
      this.form= this.$store.state['formAndstepForm'].step
    }
  }
</script>