var path = require('path')
var webpack = require('webpack')
var CompressionPlugin = require("compression-webpack-plugin");
var LessHintPlugin = require('lesshint-webpack-plugin');
module.exports = {
    entry: {
        regenerator: 'babel-regenerator-runtime',
        build: './app/bootstrap.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    // build: {
    //   assetsPublicPath: '/',
    //   assetsSubDirectory: 'static',
    // },
    module: {
        rules:
            [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                // {
                //     test: /\.json$/,
                //     loader: 'babel-loader',
                //     exclude: /node_modules/
                // },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            // Since sass-loader (weirdly) has SCSS as its default parse mode, we sourceMap
                            // the "scss" and "sass" values for the lang attribute to the right configs here.
                            // other preprocessors should work out of the box, no loader config like this necessary.
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        }          // other vue-loader options go here
                    }
                },
                {
                    test: /\.less$/,
                    loader: "style-loader!css-loader!less-loader"
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader?exportAsEs6Default',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'css-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }


            ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.ts', '.js', '.json', '.html']
    },
    devServer: {
        historyApiFallback: true,
            noInfo: true,
            inline: true,
            overlay: {
            errors: true,
        }
    },
    performance: {
        hints: 'warning'
    },
    devtool: '#eval-source-sourceMap',
    // plugins: [new webpack.]
        plugins: [
        new LessHintPlugin({
            files: ['./app/**/*.less'],
            configFile: path.resolve(__dirname, './lesshintrc.json'),
        }),
]

}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-sourceMap'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
        // Added as the last plugin
        // Not sure if it's worth gzipping index.html - no harm no foul
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })

        // new webpack.DefinePlugin({
        //   'process.env': {
        //     NODE_ENV: '"production"'
        //   }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: true,
        //   compress: {
        //     warnings: false
        //   }
        // }),
        // new webpack.LoaderOptionsPlugin({
        //   minimize: true
        // })
    ])
}
