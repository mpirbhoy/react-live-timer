var webpack = require('webpack');


module.exports = {
  entry: './src/Timer.js',
  output: {
    path: __dirname + '/dist',
    filename: 'Timer.js',
    library: "Timer",
    libraryTarget: 'umd'
  }, 
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
  }]}
};