import {fakeSubmitForm} from "./service";
import to from "await-to-js";

const Model = {
    namespaced: true,
    namespace: 'formAndstepForm',
    state: {
        current: 'info',
        step: {
            payAccount: 'ant-design@alipay.com',
            receiverAccount: 'test@example.com',
            receiverName: 'Alex',
            amount: '500',
        },
    },
    mutations: {
        saveCurrentStep(state, {payload}) {
            state.current = payload
        },
        saveStepFormData(state, {payload}) {
            state.step = {...state.step, ...payload}
        },
    },
    actions: {
        //eslint-disable-next-line
        async submitStepForm({commit}, {payload}) {
            await to(fakeSubmitForm(payload));
            commit({
                type: 'saveStepFormData',
                payload,
            });
            commit({
                type: 'saveCurrentStep',
                payload: 'result',
            });
        },
    }
};
export default Model;
