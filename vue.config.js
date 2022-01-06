const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  publicPath: isDev ? '/' : './',
  /**
  * 修改入口文件路径
  */
  // pages: {
  //   index: {
  //     entry: 'examples/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html'
  //   }
  // },
  chainWebpack: config => {
  },
  devServer: {
    hot: true, // 是否配置热更新
    open: true, // 配置自动启动浏览器
    proxy: {
      '/faceId': {
        // 人脸识别
        target: 'https://api.megvii.com/faceid/lite',
        // ws: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: { '^/faceId': '' }
      }
    }
  }
};
