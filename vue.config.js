const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // config.plugins.delete('prefetch')
    // 修改标题
    config.plugin('html').tap(args => {
      args[0].title = 'MyBlog'
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        // 注释console.*
        args[0].terserOptions.compress.drop_console = true
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true
        // 移除 console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log']
        // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
        args[0].terserOptions.output = {
          comments: false
        }
        return args
      })

      // 修改生产环境下的打包入口
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      // config.plugins.delete('prefetch')

      // 为生产环境修改配置...
      config.mode = 'production'
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.mp3$/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false //是否删除原文件
          })
        ]
      }
    } else {
      // 开发环境
      config
        .entry('app')
        .clear()
        .add('./src/main.js')
    }
  },
  devServer: {
    proxy: {
      //后台服务器
      '/api1': {
        // 匹配所有以 '/api1'开头的请求路径
        target: 'http://127.0.0.1:3007', // 代理目标的基础路径
        changeOrigin: true,
        // logLevel: 'debug',
        pathRewrite: { '^/api1': '' }
      },
      // 网易云api
      '/api2': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'http://music.cyrilstudio.top:80', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' }
      }
    }
  },
  // productionSourceMap: true,
  configureWebpack: {
    devtool: 'cheap-module-source-map'
  }
}
