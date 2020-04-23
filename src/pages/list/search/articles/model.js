import to from "await-to-js";
import { queryFakeList } from "./service";

const Model = {
  namespaced: true,
  namespace: "listAndsearchAndarticles",
  state: {
    list: []
  },
  mutations: {
    queryList(state, action) {
      state.list = action.payload;
    },

    appendList(state, action) {
      state.list = state.list.concat(action.payload);
    }
  },
  actions: {
    //eslint-disable-next-line
      async fetch({commit},{ payload }) {
      const [err, response] = await to(queryFakeList(payload));
      if (!err) {
        commit({
          type: "queryList",
          payload: Array.isArray(response) ? response : []
        });
      }
    },

    async appendFetch({ commit }, { payload }) {
      const [err, response] = await to(queryFakeList(payload));
      if (!err) {
        commit({
          type: "appendList",
          payload: Array.isArray(response) ? response : []
        });
      }
    }
  }
};

export const registerModel = $store => {
  if (
    !$store._modulesNamespaceMap[
      Model.namespace + (Model.namespaced ? "/" : "")
    ]
  ) {
    $store.registerModule(Model.namespace, Model);
  }
};
export default Model;
