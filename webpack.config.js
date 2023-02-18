const minimist = require("minimist");
const envSettings = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development", // NODE_ENVに指定が無い場合のデフォルト
  },
};
const options = minimist(process.argv.slice(2), envSettings);
const isProduction = options.env === "production" ? true : false;

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./js/index.js",
  output: {
    filename: "index.min.js"
  },
   module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-browser.prod.js'
    }
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
