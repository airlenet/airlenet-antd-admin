/* eslint-disable */
import { queryNotices } from "@/services/user";
export default {
  namespace: "global",
  state: {
    collapsed: false,
    notices: []
  },
  mutations: {
    changeLayoutCollapsed(state,collapsed) {
      state.collapsed = collapsed;
      // state.notices = [];
    },
    saveNotices(state, payload) {
      state.collapsed = false;
      state.notices = payload;
    }
  },
  actions: {
    fetchNotices({ commit }) {
      return new Promise((resolve, reject) => {
        queryNotices()
          .then(data => {
            commit("saveNotices", data);

              const unreadCount= data.filter(item => !item.read).length

              commit("changeNotifyCount", {totalCount: data.length,unreadCount});

            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  }
};
/* eslint-enable */
