const path = require('path')

module.exports = {
    entry: './src/core/server.js',
    target: 'node',
    node: {
        __dirname: true
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
