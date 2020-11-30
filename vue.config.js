const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const TerserPlugin = require("terser-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin"); // 引入插件

module.exports = {
  publicPath: isDev ? "/" : "./",
  transpileDependencies: ["webpack-dev-server/client"],
  chainWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("config", resolve("src/config"))
      .set("utils", resolve("src/utils"))
      .set("pages", resolve("src/pages"))
      .set("layouts", resolve("src/layouts"));
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use(["pug-plain-loader"])
      .loader("pug-plain-loader")
      .end();
    config.optimization.splitChunks({
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "commons",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          // 抽离第三插件
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10
        }
      }
    });
  },

  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"]
            }
          }
        }),
        // 优化打包速度
        new ParallelUglifyPlugin({
          // 传递给 UglifyJS的参数如下：
          uglifyJS: {
            output: {
              /*
               是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
               可以设置为false
              */
              beautify: false,
              /*
               是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
              */
              comments: false
            },
            compress: {
              /*
               是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
              */
              drop_console: true,

              /*
               是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
               转换，为了达到更好的压缩效果，可以设置为false
              */
              collapse_vars: true,

              /*
               是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
               var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
              */
              reduce_vars: true
            }
          },
          /*
               是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
               不大的警告
              */
          warnings: false
        })
      ]
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      // 新增start
      modules: [resolve("src"), resolve("node_modules")]
      // 新增end
      // alias: {
      //   'vue$': 'vue/dist/vue.esm.js',
      //   '@': resolve('src'),
      // },
    }
  },
  devServer: {
    hot: true, // 是否配置热更新
    open: true, // 配置自动启动浏览器
    proxy: {
      // 配置多个代理跨域(配置一个 proxy: 'http://localhost:4000' )
      "/api": {
        target: "http://test.hwasbank.com/hclub-service",
        // ws: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: { "^/api": "" },
        headers: {
          // 重点在这里，添加配置项 headers 就可以了
          Referer: "http://weixin.qq.com/"
        }
      },
      "/faceId": {
        // 人脸识别
        target: "https://api.megvii.com/faceid/lite",
        // ws: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: { "^/faceId": "" }
      }
      // '/ccdApi': { // 获取行情咨询详情的
      //   target: 'https://testapp.aifound.cn',
      //   // ws: true,
      //   changeOrigin: true, // 是否跨域
      //   pathRewrite: { '^/ccdApi': '' }
      // },
    }
  }
};

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
