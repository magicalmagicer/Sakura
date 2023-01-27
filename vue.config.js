const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
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
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ElementUI',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        echarts: 'echarts'
      }
      config.externals(externals)
      // const cdn = {
      //   // 从cdn中获取对象文件，减少打包体积
      //   css: [
      //     // element-ui css
      //     'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/theme-chalk/index.css',
      //     // nprogress
      //     'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
      //   ],
      //   js: [
      //     // vue
      //     'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
      //     // vue-router
      //     'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
      //     // vuex
      //     'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
      //     // axios
      //     'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js',
      //     // element-ui js
      //     'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/index.js'
      //   ]
      // }
      // // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      // config.plugin('html').tap(args => {
      //   args[0].cdn = cdn
      //   return args
      // })

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

      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()

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
        // target: 'http://120.46.168.254:3007', // 代理目标的基础路径
        target: 'http://127.0.0.1:3007', // 代理目标的基础路径

        changeOrigin: true,
        // logLevel: 'debug',
        pathRewrite: { '^/api1': '' }
      },
      // 网易云api
      '/api2': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'http://120.46.168.254:3000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' }
      },
      '/api3': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'https://restapi.amap.com/v3/ip?', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api3': '' }
      }
    }
  },
  // productionSourceMap: false,
  configureWebpack: {
    // devtool: 'cheap-module-source-map',
    // externals: {
    //   vue: 'Vue',
    //   axios: 'axios',
    //   'element-ui': 'ElementUI',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex'
    // },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面两项配置才是 compression-webpack-plugin 压缩配置
      // 压缩成 .gz 文件
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
