<template>
  <NoticeIcon
    :loading="fetchingNotices"
    :count="count"
    :className="styles.action"
    @onItemClick="
      item => {
        changeReadState(item);
      }
    "
    clearText="清空"
    viewMoreText="查看更多"
    @onClear="handleNoticeClear"
    @onPopupVisibleChange="() => {}"
    @onViewMore="() => this.$message.info('Click on view more')"
    clearClose
  >
    <NoticeIconTab
      tabKey="notification"
      :count="unreadMsg.notification"
      :list="noticeData.notification"
      title="通知"
      emptyText="你已查看所有通知"
      :showViewMore="true"
    />
    <NoticeIconTab
      tabKey="message"
      :count="unreadMsg.message"
      :list="noticeData.message"
      title="消息"
      emptyText="您已读完所有消息"
      :showViewMore="true"
    />
    <NoticeIconTab
      tabKey="event"
      title="待办"
      emptyText="你已完成所有待办"
      :count="unreadMsg.event"
      :list="noticeData.event"
      :showViewMore="true"
    />
  </NoticeIcon>
</template>

<script>
import NoticeIcon from "../NoticeIcon/NoticeIcon";
import NoticeIconTab from "../NoticeIcon/NoticeIconTab";
import groupBy from "lodash/groupBy";
import styles from "./index.module.less";
import { mapState } from "vuex";

export default {
  name: "NoticeIconView",
  components: { NoticeIconTab, NoticeIcon },
  data() {
    return {
      styles
    };
  },
  computed: {
    ...mapState({
      fetchingNotices: state => state.loading.effects.fetchNotices
    }),
    collapsed() {
      return this.$store.state.global.collapsed;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    notices() {
      return this.$store.state.global.notices;
    },
    count() {
      const currentUser = this.$store.state.user.currentUser;
      return currentUser && currentUser.unreadCount
        ? currentUser.unreadCount
        : 0;
    },
    noticeData() {
      if (
        !this.notices ||
        this.notices.length === 0 ||
        !Array.isArray(this.notices)
      ) {
        return {};
      }

      const newNotices = this.notices.map(notice => {
        const newNotice = { ...notice };

        if (newNotice.datetime) {
          // newNotice.datetime = moment(notice.datetime).fromNow();
        }

        if (newNotice.id) {
          newNotice.key = newNotice.id;
        }

        if (newNotice.extra && newNotice.status) {
          if (newNotice.status) {
            // const color = {
            //   todo: "",
            //   processing: "blue",
            //   urgent: "red",
            //   doing: "gold"
            // };
            //   newNotice.extra = "
            //     <Tag color={color} style="
            //     marginRight: 0,
            //
            // >
            //   {newNotice.extra}
            // </Tag>
            // "
          }
        }
        return newNotice;
      });
      return groupBy(newNotices, "type");
    },
    unreadMsg() {
      const unreadMsg = {};
      const noticeData = this.noticeData;
      Object.keys(noticeData).forEach(key => {
        const value = noticeData[key];

        if (!unreadMsg[key]) {
          unreadMsg[key] = 0;
        }

        if (Array.isArray(value)) {
          unreadMsg[key] = value.filter(item => !item.read).length;
        }
      });
      return unreadMsg;
    }
  },
  methods: {
    handleNoticeClear() {},
    changeReadState() {}
  },
  mounted() {
    this.$store.dispatch("global/fetchNotices").then(() => {});
  }
};
</script>
