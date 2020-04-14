module.exports = {
  // presets: ["@vue/app"],
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["import", { libraryName: "Antd", libraryDirectory: "es", style: true }]
  ]
};
