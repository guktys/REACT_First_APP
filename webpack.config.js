const path = require('path');

module.exports = {
    // ...остальная часть конфигурации...
    module: {
        rules: [
            // ...другие правила...
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }

        ]},]
    },
    resolve: {
        fallback: {
            timers: require.resolve('timers-browserify'),
            util: require.resolve('util/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            url: require.resolve('url'),
        }
    },  mode: 'development',
};
