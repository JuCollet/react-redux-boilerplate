const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry : {
        bundle : './client/index.js',
        vendor : ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom']
    },
    output : {
        filename : '[name].[chunkhash].js',
        path : path.resolve(__dirname, "client/dist")
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + '/client/dist',
        host: process.env.IP,
        port: process.env.PORT
    },
    module : {
        rules : [
            {
                use : 'babel-loader',
                test : /\.js$/,
                exclude : __dirname + 'node_modules',
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader!postcss-loader!less-loader'
                }),
                test : /\.less$/,
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test : /\.css$/,
            }, {
                test : /\.(png|jpeg|jpg|gif|svg)$/,
                use : [
                    {
                        loader : "url-loader",
                        options : { limit : 20000, name : "./img/[hash].[ext]"}
                    },
                    "image-webpack-loader"
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new htmlWebpackPlugin({
            title: 'React Redux Boilerplate',
            template: 'client/index.ejs',
            files : {
                css : ['styles/styles.css', ]
            }
        })
    ]
};

if (process.env.NODE_ENV === 'production') {  
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports =  config;