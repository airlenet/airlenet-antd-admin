import { queryNotices } from "@/services/user";
export default {
  namespaced: true,
  namespace: "global",
  state: {
    collapsed: false,
    notices: []
  },
  mutations: {
    changeLayoutCollapsed(state, collapsed) {
      state.collapsed = collapsed;
    },
    saveNotices(state, { payload }) {
      state.notices = payload;
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }) {
      state.notices = state.notices.filter(item => item.type !== payload);
    }
  },
  actions: {
    fetchNotices(store) {
      //eslint-disable-next-line
      const { commit, dispatch, state, rootState,rootGetters } = store
      return new Promise((resolve, reject) => {
        queryNotices()
          .then(data => {
            commit({
              type: "saveNotices",
              payload: data
            });
            const unreadCount = data.filter(item => !item.read).length;
            commit(
              {
                type: "user/changeNotifyCount",
                payload: {
                  totalCount: data.length,
                  unreadCount
                }
              },
              { root: true }
            );
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async clearNotices({ commit, state }, { payload }) {
      await commit({
        type: "saveClearedNotices",
        payload
      });
      const count = state.notices.length;
      const unreadCount = state.notices.filter(item => !item.read).length;
      commit(
        {
          type: "user/changeNotifyCount",
          payload: {
            totalCount: count,
            unreadCount
          }
        },
        { root: true }
      );
    },
    async changeNoticeReadState({ commit, state }, { payload }) {
      const notices = state.notices.map(item => {
        const notice = { ...item };

        if (notice.id === payload) {
          notice.read = true;
        }
        return notice;
      });
      await commit({
        type: "saveNotices",
        payload: notices
      });
      commit(
        {
          type: "user/changeNotifyCount",
          payload: {
            totalCount: notices.length,
            unreadCount: notices.filter(item => !item.read).length
          }
        },
        { root: true }
      );
    }
  }
};
