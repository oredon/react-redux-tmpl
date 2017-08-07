module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx"
  },

  output: {
    path: __dirname + "/static",
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader?cacheDirectory"]},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'inline-source-map',
  cache: true
};
