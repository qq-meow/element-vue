const PORT = 8082; // 端口
const PROXY = 'https://127.0.0.1';

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    css: {
        extract: !0,
        sourceMap: !1,
        requireModuleExtension: !0
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
