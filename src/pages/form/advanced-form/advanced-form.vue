<template>
  <a-form-model
    ref="advancedForm"
    layout="vertical"
    hideRequiredMark
    :model="form"
    :rules="rules"
  >
    <PageHeaderWrapper
      title="高级表单"
      content="高级表单常见于一次性输入和提交大批量数据的场景。"
    >
      <a-card title="仓库管理" :class="styles.card" :bordered="false">
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item
              :label="fieldLabels.name"
              htmlFor="name"
              prop="name"
              :rules="[{ required: true, message: '请输入仓库名称' }]"
            >
              <a-input v-model="form.name" placeholder="请输入仓库名称" />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 6,
              offset: 2
            }"
            :lg="{
              span: 8
            }"
            :md="{
              span: 12
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.url"
              htmlFor="url"
              prop="url"
              :rules="[
                {
                  required: true,
                  message: '请选择'
                }
              ]"
            >
              <a-input
                v-model="form.url"
                :style="{
                  width: '100%'
                }"
                addonBefore="http://"
                addonAfter=".com"
                placeholder="请输入"
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 8,
              offset: 2
            }"
            :lg="{
              span: 10
            }"
            :md="{
              span: 24
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.owner"
              htmlFor="owner"
              prop="owner"
              :rules="[
                {
                  required: true,
                  message: '请选择管理员'
                }
              ]"
            >
              <a-select placeholder="请选择管理员" v-model="form.owner">
                <a-select-option value="xiao">付晓晓</a-select-option>
                <a-select-option value="mao">周毛毛</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item
              :label="fieldLabels.approver"
              htmlFor="approver"
              prop="approver"
              :rules="[
                {
                  required: true,
                  message: '请选择审批员'
                }
              ]"
            >
              <a-select placeholder="请选择审批员" v-model="form.approver">
                <a-select-option value="xiao">付晓晓</a-select-option>
                <a-select-option value="mao">周毛毛</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 6,
              offset: 2
            }"
            :lg="{
              span: 8
            }"
            :md="{
              span: 12
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.dateRange"
              htmlFor="dateRange"
              prop="dateRange"
              :rules="[
                {
                  required: true,
                  message: '请选择生效日期'
                }
              ]"
            >
              <a-range-picker
                v-model="form.dateRange"
                :placeholder="['开始日期', '结束日期']"
                :style="{
                  width: '100%'
                }"
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 8,
              offset: 2
            }"
            :lg="{
              span: 10
            }"
            :md="{
              span: 24
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.type"
              htmlFor="type"
              prop="type"
              :rules="[
                {
                  required: true,
                  message: '请选择仓库类型'
                }
              ]"
            >
              <a-select placeholder="请选择仓库类型" v-model="form.type">
                <a-select-option value="private">私密</a-select-option>
                <a-select-option value="public">公开</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card title="任务管理" :class="styles.card" :bordered="false">
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item
              :label="fieldLabels.name2"
              htmlFor="name2"
              prop="name2"
              :rules="[
                {
                  required: true,
                  message: '请输入'
                }
              ]"
            >
              <a-input placeholder="请输入" v-model="form.name2" />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 6,
              offset: 2
            }"
            :lg="{
              span: 8
            }"
            :md="{
              span: 12
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.url2"
              htmlFor="url2"
              prop="url2"
              :rules="[
                {
                  required: true,
                  message: '请选择'
                }
              ]"
            >
              <a-input placeholder="请输入" v-model="form.url2" />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 8,
              offset: 2
            }"
            :lg="{
              span: 10
            }"
            :md="{
              span: 24
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.owner2"
              htmlFor="owner2"
              prop="owner2"
              :rules="[
                {
                  required: true,
                  message: '请选择管理员'
                }
              ]"
            >
              <a-select placeholder="请选择管理员" v-model="form.owner2">
                <a-select-option value="xiao">付晓晓</a-select-option>
                <a-select-option value="mao">周毛毛</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item
              :label="fieldLabels.approver2"
              htmlFor="approver2"
              prop="approver2"
              :rules="[
                {
                  required: true,
                  message: '请选择审批员'
                }
              ]"
            >
              <a-select placeholder="请选择审批员" v-model="form.approver2">
                <a-select-option value="xiao">付晓晓</a-select-option>
                <a-select-option value="mao">周毛毛</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 6,
              offset: 2
            }"
            :lg="{
              span: 8
            }"
            :md="{
              span: 12
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.dateRange2"
              htmlFor="dateRange2"
              prop="dateRange2"
              :rules="[
                {
                  required: true,
                  message: '请输入'
                }
              ]"
            >
              <a-time-picker
                v-model="form.dateRange2"
                placeholder="提醒时间"
                :style="{
                  width: '100%'
                }"
                :getPopupContainer="
                  trigger => {
                    if (trigger && trigger.parentNode) {
                      return trigger.parentNode;
                    }

                    return trigger;
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{
              span: 8,
              offset: 2
            }"
            :lg="{
              span: 10
            }"
            :md="{
              span: 24
            }"
            :sm="24"
          >
            <a-form-model-item
              :label="fieldLabels.type2"
              htmlFor="type2"
              prop="type2"
              :rules="[{ required: true, message: '请选择任务类型' }]"
            >
              <a-select placeholder="请选择任务类型" v-model="form.type2">
                <a-select-option value="private">私密</a-select-option>
                <a-select-option value="public">公开</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card title="成员管理" :bordered="false">
        <a-form-model-item prop="members">
          <TableForm v-model="form.members" />
        </a-form-model-item>
      </a-card>
    </PageHeaderWrapper>
    <FooterToolbar>
      <template>
        <span v-if="errors.length > 0" :class="[styles.errorIcon]">
          <a-popover
            title="表单校验信息"
            :overlayClassName="styles.errorPopover"
            trigger="click"
            :getPopupContainer="
              trigger => {
                if (trigger && trigger.parentNode) {
                  return trigger.parentNode;
                }

                return trigger;
              }
            "
          >
            <template slot="content">
              <li
                v-for="err in errors"
                :key="err.name[0]"
                :class="styles.errorListItem"
                @click="() => scrollToField(err.name[0])"
              >
                <CloseCircleOutlined :class="styles.errorIcon" />
                <div :class="styles.errorMessage">{{ err.errors[0] }}</div>
                <div :class="styles.errorField">
                  {{ fieldLabels[err.name[0]] }}
                </div>
              </li>
            </template>

            <CloseCircleOutlined />
          </a-popover>
          {{ errors.length }}
        </span>
        <a-button
          type="primary"
          @click="submit('advancedForm')"
          :loading="submitting"
        >
          提交
        </a-button>
      </template>
    </FooterToolbar>
  </a-form-model>
</template>

<script>
import styles from "./style.module.less";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import Model from "./model.js";
import FooterToolbar from "./components/FooterToolbar";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import TableForm from "./components/TableForm";

const fieldLabels = {
  name: "仓库名",
  url: "仓库域名",
  owner: "仓库管理员",
  approver: "审批人",
  dateRange: "生效日期",
  type: "仓库类型",
  name2: "任务名",
  url2: "任务描述",
  owner2: "执行人",
  approver2: "责任人",
  dateRange2: "生效日期",
  type2: "任务类型"
};
const tableData = [
  {
    key: "1",
    workId: "00001",
    name: "John Brown",
    department: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    workId: "00002",
    name: "Jim Green",
    department: "London No. 1 Lake Park"
  },
  {
    key: "3",
    workId: "00003",
    name: "Joe Black",
    department: "Sidney No. 1 Lake Park"
  }
];
export default {
  name: "advanced-form",
  components: {
    TableForm,
    FooterToolbar,
    PageHeaderWrapper,
    CloseCircleOutlined
  },
  data() {
    return {
      styles,
      fieldLabels,
      errors: [],
      form: {
        name: "",
        url: "",
        members: tableData
      },
      rules: {
        name: [{ required: true, message: "请输入仓库名称" }]
      }
    };
  },

  created() {
    this.$store.registerModule("formAndadvancedForm", Model);
  },
  computed: {
    submitting() {
      return this.$store.state.loading.effects[
        "formAndadvancedForm/submitAdvancedForm"
      ];
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid, values) => {
        if (valid) {
          this.$store.dispatch({
            type: "formAndadvancedForm/submitAdvancedForm",
            payload: this.form
          });
        } else {
          Object.keys(values).forEach(k => {
            this.errors.push({ name: [k], errors: [values[k][0].message] });
          });
          console.log(this.errors);
          // this.errors = values;
        }
      });
    },
    getPopupContainer(trigger) {
      if (trigger && trigger.parentNode) {
        return trigger.parentNode;
      }

      return trigger;
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);

      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    }
  }
};
</script>
