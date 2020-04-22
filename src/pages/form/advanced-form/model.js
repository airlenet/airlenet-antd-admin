import { message } from "ant-design-vue";
import { fakeSubmitForm } from "./service";

const Model = {
  namespaced: true,
  namespace: "formAndadvancedForm",
  state: {},
  actions: {
    //eslint-disable-next-line
   async submitAdvancedForm({ commit },{ payload }) {
      await fakeSubmitForm(payload);
      message.success("提交成功");
    }
  }
};
export default Model;
