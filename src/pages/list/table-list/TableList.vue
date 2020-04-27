<template>
  <PageHeaderWrapper>
    <ProTable
      headerTitle="查询表格"
      rowKey="key"
      :request="params => queryRule(params)"
      :columns="columns"
    >
      <template slot="toolBarRender" slot-scope="{ action, selectedRows }">
        <a-button type="primary" @click="() => handleModalVisible(true)">
          <PlusOutlined slot="icon" />
          新建
        </a-button>
        <a-dropdown v-if="selectedRows && selectedRows.length > 0">
          <a-menu
            slot="overlay"
            @click="
              e => {
                if (e.key === 'remove') {
                  handleRemove(selectedRows);
                  action.reload();
                }
              }
            "
            selectedKeys="[]"
          >
            <a-menu-item key="remove">批量删除</a-menu-item>
            <a-menu-item key="approval">批量审批</a-menu-item>
          </a-menu>
          <a-button> 批量操作 <DownOutlined /> </a-button>
        </a-dropdown>
      </template>

      <div
        slot="tableAlertRender"
        slot-scope="{ selectedRowKeys, selectedRows }"
      >
        已选择&nbsp;&nbsp;
        <a
          :style="{
            fontWeight: 600
          }"
        >
          {{ selectedRowKeys.length }} </a
        >&nbsp;&nbsp; 项&nbsp;&nbsp;
        <span>
          服务调用次数总计
          {{ selectedRows.reduce((pre, item) => pre + item.callNo, 0) }} 万
        </span>
      </div>
      <!--eslint-disable-next-line-->
        <template slot="option" slot-scope="text, record">
        <a
          @click="
            () => {
              this.handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }
          "
        >
          配置
        </a>
        <a-divider type="vertical" />
        <a href="">订阅警报</a>
      </template>
    </ProTable>
  </PageHeaderWrapper>
</template>

<script>
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import ProTable from "../../../components/ProTable/ProTable";
import { DownOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { queryRule } from "./service.js";
export default {
  name: "TableList",
  components: { ProTable, PageHeaderWrapper, DownOutlined, PlusOutlined },
  data() {
    return {
      columns: [
        {
          title: "规则名称",
          dataIndex: "name"
        },
        {
          title: "描述",
          dataIndex: "desc"
        },
        {
          title: "服务调用次数",
          dataIndex: "callNo",
          sorter: true,
          renderText: val => `${val} 万`
        },
        {
          title: "状态",
          dataIndex: "status",
          valueEnum: {
            0: {
              text: "关闭",
              status: "Default"
            },
            1: {
              text: "运行中",
              status: "Processing"
            },
            2: {
              text: "已上线",
              status: "Success"
            },
            3: {
              text: "异常",
              status: "Error"
            }
          }
        },
        {
          title: "上次调度时间",
          dataIndex: "updatedAt",
          sorter: true,
          valueType: "dateTime"
        },
        {
          title: "操作",
          dataIndex: "option",
          valueType: "option",
          scopedSlots: { customRender: "option" }
        }
      ]
    };
  },
  methods: {
    //eslint-disable-next-line
        handleModalVisible(show){

        },
    handleUpdateModalVisible() {},
    queryRule(params) {
      return queryRule(params);
    },
    //eslint-disable-next-line
        handleRemove(selectedRows){

       }
  }
};
</script>
