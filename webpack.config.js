var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
          './src/index.js'
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
          path: __dirname + '/dist'
            },

    plugins: [HTMLWebpackPluginConfig]
};
