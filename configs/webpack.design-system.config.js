const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const distFolder = path.resolve(__dirname, '../dist');
const uiFolder = `design-system`;

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        "design-system": "./design-system.js"
    },
    output: {
        path: distFolder,
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${uiFolder}/img`,
                            publicPath: './img/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${uiFolder}/fonts`,
                            publicPath: './fonts/'
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ],
                }
            })
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: `${uiFolder}/design-system.css`
        })
    ]
};
