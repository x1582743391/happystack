const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    mode: 'development', //通过配置是开发环境还是生产环境，webpack会有不同的优化策略
    entry: {
        index: './src/main.ts',
    },
    output: {
        filename: 'js/[name]-[hash:5].js',
        path: resolve(__dirname, 'doc'),
        assetModuleFilename:'assets/[name][ext][query]',
        clean: true
    },
    // webpack-dev-server need webpack-dev-server plugin
    devServer: {
        contentBase: resolve(__dirname, 'doc'),
        // 设置端口
        port: 1300,
        open: true,
        hot: true
    },
    module: {
        rules: [{
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
                type: 'asset/resource',
              },
            {
                test: /\.html$/i,
                use: [{
                    loader: 'html-loader',
                }]
            }
        ]
    },
    optimization: {
        minimize: true,
        splitChunks:{
            chunks:'all',
        },
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          `...`,
          new CssMinimizerPlugin({
            exclude:/node_modules/
          }),
        ],
      },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name]-[hash:5].css'
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            $css: resolve(__dirname, 'src/style')
        }
        // 配置可以忽略那些类型的文件后缀。
        ,
        extensions: [
            '.js', '.ts'
        ],
        modules: [
            resolve(__dirname, './node_modules'), 'node_modules'
        ]

    }
}