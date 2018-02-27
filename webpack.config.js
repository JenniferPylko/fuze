const path = require("path")

module.exports = {
    mode: "production",
    watch: true,
    entry: "./src/js/fuze.js",
    output: {
        filename: "fuze.js",
        path: path.resolve(__dirname, "dist")
    },

    cache: true,
    devtool: "source-map",
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
}
