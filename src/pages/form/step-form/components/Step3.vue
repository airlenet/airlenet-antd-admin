<template>
  <a-result status="success"
            title="操作成功"
            subTitle="预计两小时内到账"

            :class="styles.result">
    <template slot="extra">
      <a-button type="primary" @click="onFinish">
        再转一笔
      </a-button>
      <a-button>查看账单</a-button>
    </template>

    <div :class="styles.information">
      <a-descriptions :column="1">
        <a-descriptions-item label="付款账户"> {{data.payAccount}}</a-descriptions-item>
        <a-descriptions-item label="收款账户"> {{data.receiverAccount}}</a-descriptions-item>
        <a-descriptions-item label="收款人姓名"> {{data.receiverName}}</a-descriptions-item>
        <a-descriptions-item label="转账金额">
          <a-statistic :value="data.amount" suffix="元"/>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-result>
</template>

<script>
  import styles from "./Step3.module.less"

  export default {
    name: "Step3",
    data() {
      return {
        styles,
      }
    },
    computed: {
      data() {
        return this.$store.state['formAndstepForm'].step
      }
    },
    methods: {
      onFinish() {
        this.$store.commit({
          type: 'formAndstepForm/saveCurrentStep',
          payload: 'info',
        });
      }
    }

  }
</script>