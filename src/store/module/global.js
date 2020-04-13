/* eslint-disable */
import { queryNotices } from "@/services/user";
export default {
  namespace: "global",
  state: {
    collapsed: false,
    notices: []
  },
  mutations: {
    changeLayoutCollapsed(state) {
      state.collapsed = true;
      state.notices = [];
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
    fetchCurrent({ commit }) {
      return new Promise((resolve, reject) => {
        queryCurrent()
          .then(res => {
            commit("saveCurrentUser", response);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== "/user/login" && !redirect) {
        // router.replace({
        //     pathname: '/user/login',
        //     search: stringify({
        //         redirect: window.location.href,
        //     }),
        // });
      }
    },
  }
};
/* eslint-enable */
