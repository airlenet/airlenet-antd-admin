import Mock from "mockjs";
import user from "./user.js";
import notices from "./notices.js";
import api from "./api";
Mock.setup({
  timeout: 3000
});
Mock.mock(/\/api\/currentUser/, user.currentUser);
Mock.mock(/\/api\/notices/, notices.getNotices);

Mock.mock(/\/api\/fake_list/, "get", api.getFakeList);
Mock.mock(/\/api\/fake_list/, "post", api.postFakeList);
