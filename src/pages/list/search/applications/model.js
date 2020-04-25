import { queryFakeList } from "./service";

const Model = {
  namespaced: true,
  namespace: "listAndsearchAndapplications",
  state: {
    list: []
  },
  actions: {
    async fetch({ commit }, { payload }) {
      const response = await queryFakeList(payload);
      commit({
        type: "queryList",
        payload: Array.isArray(response) ? response : []
      });
    }
  },
  mutations: {
    queryList(state, action) {
      state.list = action.payload;
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
