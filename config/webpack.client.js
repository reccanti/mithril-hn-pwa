const path = require('path')

module.exports = {
    entry: './src/core/index.js',
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
    }
}