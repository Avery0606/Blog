module.exports = {
    //axios域代理，解决axios跨域问题
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}