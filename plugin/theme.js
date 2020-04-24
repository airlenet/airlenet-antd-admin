const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
// const { createMockMiddleware } = require("umi-mock-middleware");
const path = require("path");
const options = {
    antDir: path.join(__dirname, "../node_modules/ant-design-vue"),
    stylesDir: path.join(__dirname, "../src"),
    varFile: path.join(
        __dirname,
        "../node_modules/ant-design-vue/es/style/themes/default.less"
    ),
    publicPath:process.env.NODE_ENV === 'production'
        ? '/ant-design-vue-pro/'
        : '',
    mainLessFile: "",
    themeVariables: ["@primary-color"],
    generateOnce: false
};

const themePlugin = new AntDesignThemePlugin(options);
module.exports=themePlugin