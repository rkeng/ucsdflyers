var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
          path.resolve(__dirname, 'src/index.js')
            ],

    module: {
          loaders: [
                      {test: /\.js$/,
                       exclude: /node_modules/,
                       loader:'babel-loader'}
                    ]
            },

    output: {
          filename: "index_bundle.js",
          path: path.resolve(__dirname, 'dist')
            },

    plugins: [HTMLWebpackPluginConfig]
};
