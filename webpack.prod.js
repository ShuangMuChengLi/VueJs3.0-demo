const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            }
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename:  '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {from: 'resource', to: 'resource'}
        ])
    ],
});
