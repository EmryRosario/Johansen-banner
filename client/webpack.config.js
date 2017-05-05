const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: '[name].js'
  },
  module: {
    rules: [

{test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')},
{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css')
  ]
}
