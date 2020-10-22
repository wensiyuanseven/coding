module.exports = {
  devServer: {
    watchOptions: {
      poll: 2000,
      ignored: /node_modules/,
      aggregateTimeout: 2000
    }
  }
};
