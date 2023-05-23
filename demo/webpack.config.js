
const { resolve } = require('path')
const BasicPlugin = require('./plugins/examplePlugin')

module.exports = {
    entry: {
        index: './src/index.js',
        other: './src/js/ohter.js'
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        // 从入口文件开始扫描, 如果遇到 import xxx.js 则通过对应custom-loader进行处理
        // 如果遇到 import xxx.css 则用single-style-loader进行处理
        rules: [
            {
                test: /\.js$/,
                use: ['custom-loader']
            },
            {
                test: /\.css$/,
                use: ['single-style-loader']
            }
        ]
    },
    plugins: [new BasicPlugin({ name: 'basicPlugin' })],

    // 配置自定义loader别名,
    // 因为不是在npm下载的,webpack识别不到自定义loader的名称以及对应的loader路径
    resolveLoader: {
        alias: {
            "custom-loader": resolve(__dirname, "./loader/index.js"),
            "single-style-loader": resolve(__dirname, './loader/single-style-loader.js')
        }
    }
}