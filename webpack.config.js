const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            index: './src/page/index.js'
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },{
                    test: /\.(css|s[ac]ss)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },{
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                }  
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                // inject: true,
                template: 'assets/index.html'
            })
        ],
        devServer: {
            host: '0.0.0.0',
            port: 3001,
            disableHostCheck: true
        }
    }
};
