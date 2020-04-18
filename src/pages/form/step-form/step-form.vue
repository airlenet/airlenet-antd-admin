<template>
    <PageHeaderWrapper
      :contentWidth="contentWidth"
      :content="$t('formandstep-form.basic.description')"
      :title="$t('formandstep-form.basic.title')">
      <a-card :bordered="false">
        <a-steps :current="currentStep" :class="{[styles.steps]:true}">
          <a-step title="填写转账信息"></a-step>
          <a-step title="确认转账信息"></a-step>
          <a-step title="完成"></a-step>
        </a-steps>
        <Step1 v-if="currentStep==0"/>
        <Step2 v-if="currentStep==1"/>
        <Step3 v-if="currentStep==2"/>
      </a-card>
    </PageHeaderWrapper>
</template>

<script>
  import {registerLocaleMessage} from "./locales"
  import Model from "./model.js";
    import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
  import Step1 from "./components/Step1";
  import Step2 from "./components/Step2";
  import Step3 from "./components/Step3";
  import styles from "./style.module.less"
    export default {
        name: "step-form",
      components: {Step1,Step2,Step3, PageHeaderWrapper},
    props: {
      contentWidth:{}
    },
      data() {
          return{
            styles,
          }
      },
      created() {
        registerLocaleMessage(this.$i18n)
        this.$store.registerModule("formAndstepForm", Model);
      },
      computed:{
        current(){
         return this.$store.state['formAndstepForm'].current
        },
        currentStep(){
          switch(this.current){
            case 'confirm':
              return 1
            case 'result':
              return 2
            default :
              return 0
          }
        }
      }

    }
</script>
