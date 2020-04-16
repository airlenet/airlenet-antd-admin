/* eslint-disable */
import { queryNotices } from "@/services/user";
export default {
  namespaced: true,
  namespace: "global",
  state: {
    collapsed: false,
    notices: []
  },
  mutations: {
    changeLayoutCollapsed(state,collapsed) {
      state.collapsed = collapsed;
    },
    saveNotices(state, payload) {
      state.notices = payload;
    }
  },
  actions: {
    fetchNotices(store) {
      const { commit, dispatch, state, rootState,rootGetters } = store
      return new Promise((resolve, reject) => {
        queryNotices()
          .then(data => {
                commit("saveNotices", data);
              const unreadCount= data.filter(item => !item.read).length
              commit("user/changeNotifyCount", {totalCount: data.length,unreadCount},{root: true});
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
