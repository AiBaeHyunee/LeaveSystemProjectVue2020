// module.exports = {
//     // baseUrl: './',
//     assetsDir: 'static',
//     productionSourceMap: false,
//
//     devServer: {
//         open: process.platform === 'darwin',
//         host: 'localhost',
//         port: 8081,
//         https: false,
//         hotOnly: false,
//         // eslint-disable-next-line no-dupe-keys
//         open: true,
//         proxy: {
//             '/api': {
//                 // target: proxyTarget,
//                 target: "http://localhost:8888",
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }
const webpack = require('webpack')
module.exports = {
    devServer: {
        proxy:"http://127.0.0.1:8888", //开发环境的跨域问题解决，后端springboot服务ip 和 端口
        port: 8085,//dev模式下的前端服务端口，也就是浏览器通过localhost：8085 访问前端页面
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    }
}
