import { message } from "ant-design-vue";
import { fakeSubmitForm } from "./service";
import to from "await-to-js";
const Model = {
  namespaced: true,
  namespace: "formAndbasicForm",
  state: {},
  actions: {
    //eslint-disable-next-line
    async submitRegularForm({commit}, { payload }) {
      const [err] = await to(fakeSubmitForm(payload));
      if (err) {
        message.error("提交失败");
      } else {
        message.success("提交成功");
      }
    }
  }
};
export default Model;
