const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/frontend/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve('./dist/static'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NOW_URL'])
    ]
}