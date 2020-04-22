<template>
  <Fragment>
    <a-table :columns="columns" :dataSource="data" :pagination="false">
      <template slot="name" slot-scope="text, record">
        <a-input
          v-if="record.editable"
          autoFocus
          @change="e => handleFieldChange(e, 'name', record.key)"
          @keyPress="e => handleKeyPress(e, record.key)"
          placeholder="成员姓名"
          :value="text"
        ></a-input>
        <template v-else>{{ text }}</template>
      </template>
      <template slot="workId" slot-scope="text, record">
        <a-input
          v-if="record.editable"
          autoFocus
          @change="e => handleFieldChange(e, 'workId', record.key)"
          @keyPress="e => handleKeyPress(e, record.key)"
          placeholder="工号"
          :value="text"
        ></a-input>
        <template v-else>{{ text }}</template>
      </template>
      <template slot="department" slot-scope="text, record">
        <a-input
          v-if="record.editable"
          autoFocus
          @change="e => handleFieldChange(e, 'department', record.key)"
          @keyPress="e => handleKeyPress(e, record.key)"
          placeholder="所属部门"
          :value="text"
        ></a-input>
        <template v-else>{{ text }}</template>
      </template>

      <template slot="action" slot-scope="text, record">
        <template v-if="!!record.editable && loading"></template>
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="e => saveRow(e, record.key)"> 添加 </a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="是否要删除此行？"
              @confirm="() => remove(record.key)"
            >
              <a> 删除 </a>
            </a-popconfirm>
          </span>

          <span v-else>
            <a @click="e => saveRow(e, record.key)"> 保存 </a>
            <a-divider type="vertical" />
            <a @click="e => cancel(e, record.key)"> 取消 </a>
          </span>
        </template>
        <template v-else>
          <span>
            <a @click="e => toggleEditable(e, record.key)"> 编辑 </a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="是否要删除此行？"
              @confirm="() => remove(record.key)"
            >
              <a> 删除 </a>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
    <a-button
      :style="{
        width: '100%',
        marginTop: '16px',
        marginBottom: '8px'
      }"
      type="dashed"
      @click="newMember"
    >
      <PlusOutlined />
      新增成员
    </a-button>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { PlusOutlined } from "@ant-design/icons-vue";

export default {
  name: "TableForm",
  components: {
    Fragment,
    PlusOutlined
  },
  props: {
    value: {}
  },
  data() {
    return {
      columns: [
        {
          title: "成员姓名",
          dataIndex: "name",
          key: "name",
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "工号",
          dataIndex: "workId",
          key: "workId",
          width: "20%",
          scopedSlots: { customRender: "workId" }
        },
        {
          title: "所属部门",
          dataIndex: "department",
          key: "department",
          width: "40%",
          scopedSlots: { customRender: "department" }
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      loading: false,
      cacheOriginData: {},
      clickedCancel: false,
      data: []
    };
  },
  created() {
    if (this.value) {
      this.data = this.value;
    }
  },
  methods: {
    newMember() {},
    setData(data) {
      console.log(data);
    },
    getRowByKey(key, newData) {
      return (newData || this.data)?.filter(item => item.key === key)[0];
    },
    handleFieldChange(e, fieldName, key) {
      const newData = [...this.data];
      const target = this.getRowByKey(key, newData);

      if (target) {
        target[fieldName] = e.target.value;
        this.setData(newData);
      }
    },
    toggleEditable(e, key) {
      e.preventDefault();
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);

      if (target) {
        // 进入编辑状态时保存原始数据
        if (!target.editable) {
          this.cacheOriginData[key] = { ...target };
          // setCacheOriginData(cacheOriginData);
        }

        target.editable = !target.editable;
        this.setData(newData);
      }
    },
    saveRow(e, key) {
      e.persist();
      this.loading(true);
      setTimeout(() => {
        if (this.clickedCancel) {
          this.clickedCancel = false;
          return;
        }

        const target = this.getRowByKey(key) || {};

        if (!target.workId || !target.name || !target.department) {
          this.$message.error("请填写完整成员信息。");
          e.target.focus();
          this.loading = false;
          return;
        }

        delete target.isNew;
        this.toggleEditable(e, key);

        // this.$emit("onChange", data);

        this.loading = false;
      }, 500);
    }
  }
};
</script>
