const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  filenameHashing: false,
  devServer: {
    proxy: {
      "/wp-json/searchconsole/api/*": {
        target: "http://myplugintest.com/",
        secure: false
      }
    }
  },
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
}