<template>
  <a-config-provider>
    <!--:getPopupContainer="()=>{-->
    <!--return this.$refs['rootRef'].content-->
    <!--}"-->
    <div id="ant-design-pro-table" ref="rootRef">
      <FormSearch v-if="type === 'form'" />
      <a-card
        v-else
        :bordered="false"
        :style="{ height: '100%' }"
        :bodyStyle="{ padding: '0px' }"
      >
        <Toolbar :headerTitle="headerTitle">
          <!--eslint-disable-next-line-->
          <template slot="toolBarRender">
            <!--eslint-disable-next-line-->
            <slot name="toolBarRender" :action="action" :selectedRows="selectedRows"/>
          </template>
        </Toolbar>
        <Alert
          v-if="rowSelection"
          :selectedRowKeys="selectedRowKeys"
          :selectedRows="selectedRows"
          :onCleanSelected="onCleanSelected"
        >
          <!--eslint-disable-next-line-->
        <template slot="alertInfoRender">
            <!--eslint-disable-next-line-->
          <slot name="tableAlertRender" :selectedRowKeys="selectedRowKeys" :selectedRows="selectedRows"></slot>
          </template>
        </Alert>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="pagination"
          :rowSelection="rowSelection ? currentRowSelection : undefined"
        >
          <template
            v-for="column in columns.filter(item => item.scopedSlots)"
            :slot="column.scopedSlots.customRender"
            slot-scope="text, record"
          >
            <slot
              :name="column.scopedSlots.customRender"
              :text="text"
              :record="record"
            ></slot>
          </template>
        </a-table>
      </a-card>
    </div>
  </a-config-provider>
</template>

<script>
import FormSearch from "./Form/FormSearch";
import Toolbar from "./component/Toolbar";
import Alert from "./component/Alert";
export default {
  name: "ProTable",
  components: { Alert, Toolbar, FormSearch },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "table"
    },
    headerTitle: {},
    rowKey: {},
    columns: {
      type: Array
    },
    rowSelection: {
      type: { Boolean, Function },
      default: function() {
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
          }
        };
      }
    },
    request: {
      type: Function,
      default: function() {
        //eslint-disable-next-line
              return function (params={pageSize,current}) {
          return new Promise();
        };
      }
    }
  },
  data() {
    return {
      action: {
        total: 0
      },
      currentRowSelection: this.rowSelection,
      //   {
      //
      //   onChange: (keys, rows) => {
      //     if(this.rowSelection && this.rowSelection.onChange){
      //       this.rowSelection.onChange(keys,rows)
      //     }
      //     this.selectedRowKeys=keys
      //   }
      // },
      // selectedRows:[],
      selectedRowKeys: [],
      dataSource: [],
      pagination: {
        showTotal: (all, range) =>
          `第 ${range[0]}-${range[1]} 条/总共 ${all} 条`,
        showSizeChanger: true
        //   total: this.action.total
      }
    };
  },
  computed: {
    selectedRows() {
      const tableKey = this.rowKey;

      // dataSource maybe is a null
      // eg: api has 404 error
      const selectedRow = Array.isArray(this.dataSource)
        ? this.dataSource.filter((item, index) => {
            if (!tableKey) {
              return this.selectedRowKeys.includes(index);
            }
            if (typeof tableKey === "function") {
              const key = tableKey(item, index);
              return this.selectedRowKeys.includes(key);
            }
            return this.selectedRowKeys.includes(item[tableKey]);
          })
        : [];

      return selectedRow;
    }
  },
  created() {
    this.pagination.total = this.action.total;
  },
  methods: {
    onCleanSelected() {}
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      this.request({ current: 1, pageSize: 10 }).then(res => {
        that.dataSource = res.data;
        that.action.total = res.total;
      });
    });
  }
};
</script>
