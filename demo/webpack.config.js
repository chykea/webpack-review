
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const BasicPlugin = require('./plugins/examplePlugin')

module.exports = {
    // entry: {
    //     index: './src/index.js',
    //     other: './src/js/ohter.js'
    // },
    entry: './src/index.js',
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
                use: ['custom-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    // 'single-style-loader',
                    'style-loader', // style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。
                    'css-loader',

                ]
            }
        ]
    },
    plugins: [
        new BasicPlugin({ name: 'basicPlugin' }), // 自定义插件

        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ],

    devServer: {
        static: './dist',
        compress: true, // 是否压缩
        port: 9000,
        open: true, // open为true表示用默认浏览器打开
    },
    optimization: {
        usedExports: true, // 开启tree-shaking,在production模式下默认开启
        runtimeChunk: 'single'
    },
    // 配置自定义loader别名,
    // 因为不是在npm下载的,webpack识别不到自定义loader的名称以及对应的loader路径
    resolveLoader: {
        alias: {
            "custom-loader": resolve(__dirname, "./loader/index.js"),
            "single-style-loader": resolve(__dirname, './loader/single-style-loader.js')
        }
    }
}