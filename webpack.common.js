const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/index.js'
    },


    module: {
        rules: [

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // 设置全局exports
            // {
            //     test: require.resolve('./src/js/globals.js'),
            //     use: 'exports-loader?file,parse=helpers.parse'
            // },
            // 设置this变量
            // {
            //     test: require.resolve('./src/js/index.js'),
            //     use: 'imports-loader?this=>window'
            // },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/html/index.html"),
            filename: "index.html",
            inject: "body"
        }),
        // 提供全局变量
        // new webpack.ProvidePlugin({
        //     join: ['lodash', 'join']
        // })
    ],
};
