<template>
  <div :class="[styles.filterCardList]">
    <a-card :bordered="false">
      <a-form :form="form">
        <StandardFormRow
          title="所属类目"
          block
          :style="{
            paddingBottom: 11
          }"
        >
          <a-form-item name="category">
            <TagSelect
              expandable
              v-decorator="['category', { initialValue: ['cat1'] }]"
            >
              <TagSelectOption value="cat1">类目一</TagSelectOption>
              <TagSelectOption value="cat2">类目二</TagSelectOption>
              <TagSelectOption value="cat3">类目三</TagSelectOption>
              <TagSelectOption value="cat4">类目四</TagSelectOption>
              <TagSelectOption value="cat5">类目五</TagSelectOption>
              <TagSelectOption value="cat6">类目六</TagSelectOption>
              <TagSelectOption value="cat7">类目七</TagSelectOption>
              <TagSelectOption value="cat8">类目八</TagSelectOption>
              <TagSelectOption value="cat9">类目九</TagSelectOption>
              <TagSelectOption value="cat10">类目十</TagSelectOption>
              <TagSelectOption value="cat11">类目十一</TagSelectOption>
              <TagSelectOption value="cat12">类目十二</TagSelectOption>
            </TagSelect>
          </a-form-item>
        </StandardFormRow>
        <StandardFormRow title="其它选项" grid last>
          <a-row :gutter="16">
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item v-bind="formItemLayout" name="author" label="作者">
                <a-select
                  placeholder="不限"
                  :style="{
                    maxWidth: 200,
                    width: '100%'
                  }"
                  v-decorator="['author']"
                >
                  <a-select-option value="lisa">王昭君</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item v-bind="formItemLayout" name="rate" label="好评度">
                <a-select
                  placeholder="不限"
                  :style="{
                    maxWidth: 200,
                    width: '100%'
                  }"
                  v-decorator="['rate']"
                >
                  <a-select-option value="good">优秀</a-select-option>
                  <a-select-option ion value="normal">普通</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </StandardFormRow>
      </a-form>
    </a-card>
    <br />
    <a-list
      rowKey="id"
      :grid="{
        gutter: 24,
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1
      }"
      :loading="loading"
      :dataSource="list"
      renderItem
    >
      <a-list-item
        :key="index + '-' + item.id"
        slot="renderItem"
        slot-scope="item, index"
      >
        <a-card
          hoverable
          :bodyStyle="{
            paddingBottom: '20px'
          }"
        >
          <template slot="actions">
            <a-tooltip key="download" title="下载">
              <DownloadOutlined />
            </a-tooltip>
            <a-tooltip key="edit" title="编辑">
              <EditOutlined />
            </a-tooltip>
            <a-tooltip title="分享" key="share">
              <ShareAltOutlined />
            </a-tooltip>
            <a-dropdown key="ellipsis">
              <a-menu slot="overlay">
                <a-menu-item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.alipay.com/"
                  >
                    1st menu item
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.taobao.com/"
                  >
                    2nd menu item
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.tmall.com/"
                  >
                    3d menu item
                  </a>
                </a-menu-item>
              </a-menu>
              <EllipsisOutlined />
            </a-dropdown>
          </template>

          <a-card-meta :title="item.title">
            <a-avatar slot="avatar" size="small" :src="item.avatar" />
          </a-card-meta>
          <div :class="[styles.cardItemContent]">
            <div :class="[styles.cardInfo]">
              <div>
                <p>活跃用户</p>
                <p>
                  <span v-if="item.activeUser > 10000">
                    {{ Math.floor(item.activeUser / 10000) }}
                    <span
                      :style="{
                        position: 'relative',
                        top: -2,
                        fontSize: 14,
                        fontStyle: 'normal',
                        marginLeft: 2
                      }"
                    >
                      万
                    </span>
                  </span>
                  <template v-else>{{ item.activeUser }}</template>
                </p>
              </div>
              <div>
                <p>新增用户</p>
                <p>{{ formatUser(item.newUser) }}</p>
              </div>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined
} from "@ant-design/icons-vue";
import TagSelect from "../../../../components/TagSelect/TagSelect";
import TagSelectOption from "../../../../components/TagSelect/TagSelectOption";
import StandardFormRow from "../../../../components/StandardFormRow/index";
import { registerModel } from "./model.js";
import styles from "./style.module.less";
import numeral from "numeral";
export default {
  name: "Applications",
  components: {
    StandardFormRow,
    TagSelectOption,
    TagSelect,
    DownloadOutlined,
    EditOutlined,
    EllipsisOutlined,
    ShareAltOutlined
  },
  computed: {
    loading() {
      return this.$store.state.loading.models.listAndsearchAndapplications;
    },
    list() {
      return this.$store.state["listAndsearchAndapplications"].list;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "application",
      onFieldsChange: (_, changedFields) => {
        this.handleFormChange(changedFields);
      },
      onValuesChange: (_, values) => {
        this.handleValuesChange(values);
      }
    });
  },
  created() {
    registerModel(this.$store);
  },
  data() {
    return {
      styles,
      formItemLayout: {
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        }
      }
    };
  },
  methods: {
    formatUser(v) {
      return numeral(v).format("0,0");
    },

    handleFormChange(changedFields) {
      console.log(changedFields);
    },
    handleValuesChange(values) {
      console.log(values);
      this.$store.dispatch({
        type: "listAndsearchAndapplications/fetch",
        payload: {
          count: 8
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "listAndsearchAndapplications/fetch",
      payload: {
        count: 8
      }
    });
  }
};
</script>
