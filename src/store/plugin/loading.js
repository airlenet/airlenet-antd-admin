const createLoadingPlugin = ({
  namespace: NAMESPACE = "loading",
  includes = [],
  excludes = []
} = {}) => {
  const SHOW = "@@LOADING/SHOW";
  const HIDE = "@@LOADING/HIDE";
  return store => {
    if (store.state[NAMESPACE]) {
      throw new Error(
        `createLoadingPlugin: ${NAMESPACE} exited in current store`
      );
    }
    // new vuex的时候注册一个模块进去
    store.registerModule(NAMESPACE, {
      namespaced: true,
      state: {
        global: false, // 定义全局loading
        models: {},
        effects: {}
      },
      // 同步方法
      mutations: {
        [SHOW](state, { payload }) {
          state.global = true;
          state.effects = {
            ...state.effects,
            [payload]: true // 将当前的action 置为true
          };
          const _namespace = payload.split("/")[0];
          state.models = { ...state.models, [_namespace]: true };
        },
        [HIDE](state, { payload }) {
          state.effects = {
            ...state.effects,
            [payload]: false // 将当前的action 置为false
          };
          const _namespace = payload.split("/")[0];

          const namespace = Object.keys(state.effects)
            .filter(item => item.indexOf(_namespace) > -1)
            .some(effectKey => {
              return state.effects[effectKey];
            });

          state.models = { ...state.models, [_namespace]: namespace };
          // 遍历所有的model 将所有命名空间中的都置为false
          const global = Object.keys(state.effects).some(effectKey => {
            return state.effects[effectKey];
          });

          state.global = global;
        }
      }
    });

    store.subscribeAction({
      //eslint-disable-next-line
            before: (action, state) => {
        if (onEffect(action, includes, excludes)) {
          store.commit(
            {
              type: `${NAMESPACE}/${SHOW}`,
              payload: action.type
            },
            { root: true }
          );
        }
      },
      //eslint-disable-next-line
            after: (action, state) => {
        if (onEffect(action, includes, excludes)) {
          store.commit(
            {
              type: `${NAMESPACE}/${HIDE}`,
              payload: action.type
            },
            { root: true }
          );
        }
      }
    });
  };
};

// 判断是否要执行
function onEffect({ type }, includes, excludes) {
  if (includes.length === 0 && excludes.length === 0) {
    return true;
  }

  if (includes.length > 0) {
    return includes.indexOf(type) > -1;
  }

  return excludes.length > 0 && excludes.indexOf(type) === -1;
}

export default createLoadingPlugin;
