const publicPath =
  process.env.NODE_ENV === "production" ? "/ant-design-vue-pro/" : "/";
export default {
  publicPath: publicPath,
  /**
   * @description api请求基础路径
   */
  apiBaseUrl: {
    dev: "/",
    pro: "https://proapi.azurewebsites.net/"
  },
  storageOptions: {
    namespace: "pro__", // key prefix
    name: "ls", // name variable Vue.[ls] or this.[$ls],
    storage: "local" // storage name session, local, memory
  }
};
