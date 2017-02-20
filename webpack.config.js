var path = require('path');

module.exports = {
  entry: './src/TrInventory/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'tr-inventory.js',
    libraryTarget: 'umd',
    library: 'TR'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
}
