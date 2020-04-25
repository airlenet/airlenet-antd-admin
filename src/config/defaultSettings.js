export default {
  navTheme: "dark",
  // 拂晓蓝
  primaryColor: "#1890ff",
  layout: "sidemenu",
  contentWidth: "Fluid",
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
    defaultOpenAll: false
  },
  title: "Ant Design Pro",
  pwa: false,
  iconfontUrl: "",
    /**
     * @description api请求基础路径
     */
    baseUrl: {
        dev: '/api',
        pro: '/api'
    },
storageOptions: {
    namespace: 'pro__', // key prefix
        name: 'ls', // name variable Vue.[ls] or this.[$ls],
        storage: 'local' // storage name session, local, memory
}
}; //DefaultSettings
