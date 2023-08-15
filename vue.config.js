const path = require('path');
const terserPlugin = require('terser-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const WEBTITLE = '一个项目'; // 项目名称中文
const PORT = 8082; // 端口
const PUBLICPATH = 'web-firstTest'; // 上下文
const PROXY = 'https://127.0.0.1'; 

module.exports = {
  publicPath: '',
  assetsDir: './',
  outputDir: path.relative(__dirname, './dist'),
  outputDir: 'dist',
  // productionSourceMap: false,
  // 资源路径简写
  chainWebpack: config => {
    //添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@tab", resolve("src/assets/tab"))
  },
  // less设置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        'src/less/global.less'
      ]
    },
    cordovaPath: 'src-cordova'
  },
  devServer: {
    port: port,
    // disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1', // 开发
        pathRewrite: {
          '/api': '/' 
        }
      }
    }
  },

}
