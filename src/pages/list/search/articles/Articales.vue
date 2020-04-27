<template>
  <Fragment>
    <a-card :bordered="false">
      <a-form-model layout="inline" :model="formModel">
        <StandardFormRow
          title="所属类目"
          block
          :style="{
            paddingBottom: '11px'
          }"
        >
          <a-form-item name="category" :rules="[]" props="category">
            <TagSelect expandable v-model="formModel.category">
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
        <StandardFormRow title="owner" grid>
          <a-form-item
            name="owner"
            noStyle
            style="min-width:200px;"
            :wrapperCol="{ span: 24 }"
          >
            <a-select
              v-model="formModel.owner"
              mode="multiple"
              placeholder="选择 owner"
              style="width: 100%"
            >
              <a-select-option
                v-for="owner in owners"
                :key="owner.id"
                :value="owner.id"
              >
                {{ owner.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a :class="[styles.selfTrigger]" @click="setOwner">
            只看自己的
          </a>
        </StandardFormRow>
        <StandardFormRow title="其它选项" grid last>
          <a-row :gutter="16">
            <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
              <a-form-item
                :wrapperCol="formItemLayout.wrapperCol"
                label="活跃用户"
                name="user"
              >
                <a-select
                  placeholder="不限"
                  :style="{
                    maxWidth: '200px',
                    width: '100%'
                  }"
                >
                  <a-select-option value="lisa">李三</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
              <a-form-item
                :wrapperCol="formItemLayout.wrapperCol"
                label="好评度"
                name="rate"
              >
                <a-select
                  placeholder="不限"
                  :style="{
                    maxWidth: '200px',
                    width: '100%'
                  }"
                >
                  <a-select-option value="good">优秀</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </StandardFormRow>
      </a-form-model>
    </a-card>
    <a-card
      :bordered="false"
      :style="{
        marginTop: '24px'
      }"
      :bodyStyle="{
        padding: '8px 32px 32px 32px'
      }"
    >
      <a-list
        size="large"
        :loading="list.length === 0 ? loading : false"
        itemLayout="vertical"
        :dataSource="list"
      >
        <div
          slot="loadMore"
          :style="{
            textAlign: 'center',
            marginTop: '16px'
          }"
        >
          <a-button
            @click="fetchMore"
            :style="{
              paddingLeft: '48px',
              paddingRight: '48px'
            }"
          >
            <span v-if="loading"> <LoadingOutlined /> 加载中... </span>
            <template v-else>
              加载更多
            </template>
          </a-button>
        </div>

        <a-list-item
          slot="renderItem"
          slot-scope="item, index"
          :key="index + item.id"
        >
          <template slot="actions">
            <IconText key="star" type="star-o" :text="item.star" />
            <IconText key="like" type="like-o" :text="item.like" />
            <IconText key="message" type="message" :text="item.message" />
          </template>

          <div slot="extra" :class="[styles.listItemExtra]" />

          <a-list-item-meta>
            <a
              slot="title"
              :class="[styles.listItemMetaTitle]"
              href="{item.href}"
            >
              {{ item.title }}
            </a>
            <span slot="description">
              <a-tag>Ant Design</a-tag>
              <a-tag>设计语言</a-tag>
              <a-tag>蚂蚁金服</a-tag>
            </span>
          </a-list-item-meta>

          <ArticleListContent :data="item" />
        </a-list-item>
      </a-list>
    </a-card>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import StandardFormRow from "@/components/StandardFormRow/index.jsx";
import TagSelect from "@/components/TagSelect/TagSelect.vue";
import TagSelectOption from "@/components/TagSelect/TagSelectOption";
import styles from "./style.module.less";
import { registerModel } from "./model.js";
import IconText from "./components/IconText";
//eslint-disable-next-line
  import {LoadingOutlined} from '@ant-design/icons-vue';
import ArticleListContent from "./components/ArticleListContent";

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    },
    md: {
      span: 12
    }
  }
};
const owners = [
  {
    id: "wzj",
    name: "我自己"
  },
  {
    id: "wjh",
    name: "吴家豪"
  },
  {
    id: "zxx",
    name: "周星星"
  },
  {
    id: "zly",
    name: "赵丽颖"
  },
  {
    id: "ym",
    name: "姚明"
  }
];
export default {
  name: "Articales",
  components: {
    ArticleListContent,
    Fragment,
    StandardFormRow,
    TagSelect,
    TagSelectOption,
    LoadingOutlined,
    IconText
  },
  data() {
    return {
      styles,
      formItemLayout,
      owners: owners,
      formModel: {
        category: ["cat1"],
        owner: []
      },
      pageSize: 5
    };
  },
  created() {
    registerModel(this.$store);
    // if(!this.$store._modulesNamespaceMap[Model.namespace+(Model.namespaced?'/':'')]){
    //   this.$store.registerModule(Model.namespace, Model);
    // }
  },
  computed: {
    loading() {
      return this.$store.state.loading.effects["listAndsearchAndarticles"];
    },
    list() {
      return this.$store.state["listAndsearchAndarticles"].list;
    }
  },
  methods: {
    setOwner() {
      this.formModel.owner.length = 0;
      this.formModel.owner.push("wzj");
    },
    handleSubmit() {
      this.$store.dispatch({
        type: "listAndsearchAndarticles/fetch",
        payload: {
          count: 8
        }
      });
    },
    fetchMore() {
      this.$store.dispatch({
        type: "listAndsearchAndarticles/appendFetch",
        payload: {
          count: this.pageSize
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "listAndsearchAndarticles/fetch",
      payload: {
        count: 5
      }
    });
  },
  watch: {
    formModel: {
      //eslint-disable-next-line
        handler(newVal, oldVal) {
        console.log(newVal);
        this.handleSubmit();
      },
      immediate: false,
      deep: true
    }
  }
};
</script>
