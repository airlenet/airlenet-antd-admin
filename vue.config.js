// vue.config.js
// import webpackPlugin from './plugin.config';
const path = require("path");
const webpack = require("webpack");
const { createMockMiddleware } = require("umi-mock-middleware");
const themePlugin = require("./plugin/theme.js");
// eslint-disable-next-line
const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  // 选项...

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
    before: function(app) {
    //     // var bodyParser = require("body-parser");
    //     // app.use(bodyParser.json());
        if (process.env.MOCK !== "none") {
            app.use(createMockMiddleware());
        }
    },
    // proxy:'http://127.0.0.1:6868/ems-manage-web/',
    proxy: {
      "/api": {
        target: "https://proapi.azurewebsites.net",
        target: "http://localhost:8080",
        ws: true, //如果要代理 websockets
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api/": "/api/"
        }
      }
    }
  }
};
