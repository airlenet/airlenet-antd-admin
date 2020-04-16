const NAMESPACE = "loading"; // 定义模块名
const SHOW = "@@LOADING/SHOW"; // 显示mutation 同步type
const HIDE = "@@LOADING/HIDE";
/* eslint-disable */
const createLoadingPlugin = ({
                                 namespace = NAMESPACE,
                                 includes = [],
                                 excludes = []
                             } = {}) => {
    return store => {
        if (store.state[namespace]) {
            throw new Error(
                `createLoadingPlugin: ${namespace} exited in current store`
            );
        }

        // new vuex的时候注册一个模块进去
        store.registerModule(namespace, {
            namespaced: false,
            state: {
                global: false, // 定义全局loading
                effects: {}
            },
            // 同步方法
            mutations: {
                [SHOW](state, {
                    payload
                }) {
                    state.global = true;
                    state.effects = {
                        ...state.effects,
                        [payload]: true // 将当前的action 置为true
                    };

                },
                [HIDE](state, {
                    payload
                }) {
                    state.effects = {
                        ...state.effects,
                        [payload]: false // 将当前的action 置为false
                    };
                    // 遍历所有的model 将所有命名空间中的都置为false
                    const global = Object.keys(state.effects).some(effectKey => {
                        return state.effects[effectKey];
                    });
                    state.global = global;
                }
            }
        });


        store.subscribeAction({
            // 发起一个action 之前会走这里
            before: (action, state) => {
                if (onEffect(action, includes, excludes)) {
                    store.commit({
                        type: `${SHOW}`,
                        payload: action.type
                    });
                }
            },
            // 发起一个action 之后会走这里
            after: (action, state) => {
                if (onEffect(action, includes, excludes)) {
                    store.commit({
                        type: `${HIDE}`,
                        payload: action.type
                    });
                }
            }
        });
    };
};

// 判断是否要执行
function onEffect({
                      type
                  }, includes, excludes) {
    if (includes.length === 0 && excludes.length === 0) {
        return true;
    }

    if (includes.length > 0) {
        return includes.indexOf(type) > -1;
    }

    return excludes.length > 0 && excludes.indexOf(type) === -1;
}

export default createLoadingPlugin;
/* eslint-enable */
