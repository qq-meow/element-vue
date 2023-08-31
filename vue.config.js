const PORT = 8082; // 端口
const PROXY = 'https://127.0.0.1';
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    css: {
        extract: !0,
        sourceMap: !1,
        requireModuleExtension: !0
    },
    chainWebpack: config => {
        // 移除 preload(预载) 插件
        config.plugins.delete('preload')
        // 移除 prefetch(预取) 插件
        config.plugins.delete('prefetch')
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true
            return args
        })
        config.module
            .rule('images')
            .use('imageWebpackLoader')
            .loader('image-webpack-loader')
            .options({
                disable: process.env.NODE_ENV === 'development', // 开发环境下禁止压缩
                gifsicle: {
                    interlaced: false
                }
            })
    },
    configureWebpack: config => {
        // config.resolve = {
        //     ...config.resolve,
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js',
        //         '@': path.resolve(__dirname, './src'),
        //     }
        // }
        // config.externals = {
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'element-ui': 'ELEMENT',
        // }
        config.plugins = [
            ...config.plugins,
            // 开启 gzip 压缩
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    // 不生成.map文件
    productionSourceMap: false,
    devServer: {
        port: PORT,
        // disableHostCheck: true,
        proxy: {
            '/api': {
                target: PROXY, // 开发
                pathRewrite: {
                    '/api': '/'
                }
            }
        }
    },
}
