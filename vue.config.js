// vue.config.js
// import webpackPlugin from './plugin.config';
const path = require("path");
const webpack = require("webpack");
const themePlugin = require("./plugin/theme.js");
// eslint-disable-next-line
const resolve = dir => {
  return path.join(__dirname, dir);
};

const publicPath =
  process.env.NODE_ENV === "production" ? "/ant-design-vue-pro/" : "/";
module.exports = {
  // 选项...
  publicPath: publicPath,
  css: {
    extract: true,
    requireModuleExtension: true,
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(options => {
      options[0].title = "Ant Design Vue Pro";
      return options;
    });
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    // before: function(app) {
    //     // var bodyParser = require("body-parser");
    //     // app.use(bodyParser.json());
    //     if (process.env.MOCK !== "none") {
    //         app.use(createMockMiddleware());
    //     }
    // },
    // proxy: {
    // "/api": {
    //   target: "https://proapi.azurewebsites.net",
    //   target: "http://localhost:8080",
    //   ws: true, //如果要代理 websockets
    //   secure: false, // 如果是https接口，需要配置这个参数
    //   changeOrigin: true, //是否跨域
    //   pathRewrite: {
    //     "^/api/": "/api/"
    //   }
    // }
    // }
  }
};
