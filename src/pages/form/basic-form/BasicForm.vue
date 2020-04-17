<template>
  <PageHeaderWrapper
    :contentWidth="contentWidth"
    :content="this.$t('formandbasic-form.basic.description')"
    :title="$t('formandbasic-form.basic.title')"
  >
    <a-card :bordered="false">
      <a-form
        :hideRequiredMark="true"
        :style="{ marginTop: '8px' }"
        name="basic"
        :form="form"
        :initialValues="{
          public: '1'
        }"
        @submit="handleSubmit"
        onFinishFailed="{onFinishFailed}"
        onValuesChange="{onValuesChange}"
      >
        <a-form-item
          :label="$t('formandbasic-form.title.label')"
          name="title"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'title',
              {
                rules: [
                  {
                    required: true,
                    message: $t('formandbasic-form.title.required')
                  }
                ]
              }
            ]"
            :placeholder="$t('formandbasic-form.title.placeholder')"
          ></a-input>
        </a-form-item>

        <a-form-item
          :label="$t('formandbasic-form.date.label')"
          name="date"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-range-picker
            v-decorator="[
              'date',
              {
                rules: [
                  {
                    required: true,
                    message: $t('formandbasic-form.date.required')
                  }
                ]
              }
            ]"
            :style="{ width: '100%' }"
            :placeholder="[
              $t('formandbasic-form.placeholder.start'),
              $t('formandbasic-form.placeholder.end')
            ]"
          />
        </a-form-item>

        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          :label="$t('formandbasic-form.goal.label')"
          name="goal"
        >
          <a-textarea
            v-decorator="[
              'goal',
              {
                rules: [
                  {
                    required: true,
                    message: $t('formandbasic-form.goal.required')
                  }
                ]
              }
            ]"
            :style="{
              minHeight: '32px'
            }"
            :placeholder="$t('formandbasic-form.goal.placeholder')"
            :rows="4"
          />
        </a-form-item>

        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          :label="$t('formandbasic-form.standard.label')"
          name="standard"
        >
          <a-textarea
            v-decorator="[
              'standard',
              {
                rules: [
                  {
                    required: true,
                    message: $t('formandbasic-form.standard.required')
                  }
                ]
              }
            ]"
            :style="{
              minHeight: '32px'
            }"
            :placeholder="$t('formandbasic-form.standard.placeholder')"
            :rows="4"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          name="client"
        >
          <span slot="label">
            {{ $t("formandbasic-form.client.label") }}
            <em :class="{ [styles.optional]: true }">
              {{ $t("formandbasic-form.form.optional") }}
              <a-tooltip :title="$t('formandbasic-form.label.tooltip')">
                <InfoCircleOutlined
                  :style="{
                    marginRight: '4px'
                  }"
                />
              </a-tooltip>
            </em>
          </span>
          <a-input
            v-decorator="['client']"
            :placeholder="$t('formandbasic-form.client.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          name="invites"
        >
          <span slot="label">
            {{ $t("formandbasic-form.invites.label") }}

            <em className="{styles.optional}">
              {{ $t("formandbasic-form.form.optional") }}
            </em>
          </span>
          <a-input
            v-decorator="['invites']"
            :placeholder="$t('formandbasic-form.invites.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          name="weight"
        >
          <span slot="label">
            {{ $t("formandbasic-form.weight.label") }}
            <em className="{styles.optional}">
              {{ $t("formandbasic-form.form.optional") }}
            </em>
          </span>
          <a-input-number
            v-decorator="['weight']"
            :placeholder="$t('formandbasic-form.weight.placeholder')"
            :min="0"
            :max="100"
          />
          <span class="ant-form-text">%</span>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          :label="$t('formandbasic-form.public.label')"
          :help="$t('formandbasic-form.label.help')"
          name="publicType"
        >
          <div>
            <a-radio-group v-decorator="['publicType', { initialValue: '1' }]">
              <a-radio value="1">
                {{ $t("formandbasic-form.radio.public") }}
              </a-radio>
              <a-radio value="2">
                {{ $t("formandbasic-form.radio.partially-public") }}
              </a-radio>
              <a-radio value="3">
                {{ $t("formandbasic-form.radio.private") }}
              </a-radio>
            </a-radio-group>
            <a-form-item :style="{ marginBottom: '0px' }" name="publicUsers">
              <a-select
                v-decorator="['publicUsers']"
                mode="multiple"
                :placeholder="$t('formandbasic-form.publicUsers.placeholder')"
                :style="{
                  margin: '8px 0',
                  display: showPublicUsers ? 'block' : 'none'
                }"
              >
                <a-select-option value="1">
                  {{ $t("formandbasic-form.option.A") }}
                </a-select-option>
                <a-select-option value="2">
                  {{ $t("formandbasic-form.option.B") }}
                </a-select-option>
                <a-select-option value="3">
                  {{ $t("formandbasic-form.option.C") }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item
          :wrapperCol="submitFormLayout.wrapperCol"
          :style="{
            marginTop: '32px'
          }"
        >
          <a-button type="primary" htmlType="submit" :loading="submitting">
            {{ $t("formandbasic-form.form.submit") }}
          </a-button>
          <a-button :style="{ marginLeft: '8px' }">
            {{ $t("formandbasic-form.form.save") }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </PageHeaderWrapper>
</template>

<script>
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import styles from "./style.module.less";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import {registerLocaleMessage} from "./locales"
import Model from "./model.js";
export default {
  name: "BasicForm",
  props: {
    contentWidth: {}
  },
  components: { PageHeaderWrapper, InfoCircleOutlined },
  created() {
    registerLocaleMessage(this.$i18n)
    this.$store.registerModule("formAndbasicForm", Model);
  },
  data() {
    return {
      styles,
      // form: this.$form.createForm(this, {name: "basic"}),
      formItemLayout: {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 7
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 12
          },
          md: {
            span: 10
          }
        }
      },
      submitFormLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 10,
            offset: 7
          }
        }
      },
      showPublicUsers: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "basic",
      onFieldsChange: (_, changedFields) => {
        this.handleFormChange(changedFields);
      },
      onValuesChange: (_, values) => {
        this.handleValuesChange(values);
      }
    });
  },
  computed: {
    submitting() {
      return this.$store.state.loading.effects[
        "formAndbasicForm/submitRegularForm"
      ];
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch({
            type: "formAndbasicForm/submitRegularForm",
            payload: values
          });
        }
      });
    },
    handleFormChange(changedFields) {
      console.log("changedFields", changedFields);
      this.fields = { ...this.fields, ...changedFields };
    },
    handleValuesChange(values) {
      if (values.publicType) {
        this.showPublicUsers = values.publicType == "2";
      }
      console.log("valuesChange", values);
    }
  },
  destroyed() {
    this.$store.unregisterModule("formAndbasicForm");
  },
  mounted() {
    console.log("");
  }
};
</script>
