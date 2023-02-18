const { dest, parallel, watch } = require("gulp");

const browserSync = require("browser-sync").create();
const path = require("path");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const minimist = require("minimist");
const envSettings = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development",
  },
};
const options = minimist(process.argv.slice(2), envSettings);
const isProduction = options.env === "production" ? true : false;

const paths = {
  js: "js/",
  root: "public/",
  webpackConfig: "./webpack.config.js",
};

const serverTask = () => {
  browserSync.init({
    server: {
      baseDir: paths.root,
    },
    reloadDelay: 1000,
    open: false,
    startPath: '/',
  });
}

const reload = (done) => {
  browserSync.reload();
  done();
};

const vueCompile = () => {
  const webpackConfigPath = path.resolve(__dirname, "webpack.config");
  delete require.cache[webpackConfigPath];
  const webpackConfig = require(webpackConfigPath);
  return webpackStream(webpackConfig, webpack).on("error", function() {
    this.emit("end");
  })
  .pipe(dest(paths.root + 'js'))
  .pipe(browserSync.stream())
}

// Watch
const watchTask = (done)=> {
  watch([paths.js + '*.js', paths.js + 'components/*.vue'], vueCompile);
  watch(paths.root + '*.html', reload)
  done()
}
// Notificate mode
console.log(isProduction ? '[\x1b[31mProduction Mode ( ･∀･)=b GJ \x1b[39m]' : '[\x1b[34mDevelopment ModeΣd=(・ω-｀o)ｸﾞｯ♪ \x1b[39m]')

exports.default = parallel(serverTask, vueCompile, watchTask);
