module.exports = {
  entry: './cheerio.js',
  output: {
    path: __dirname + '/app/lib/',
    filename: 'cheerio.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules'],
    alias: {
      cheerio: __dirname + '/node_modules/cheerio/index.js',
      events: __dirname + '/node_modules/events/events.js',
      stream: __dirname + '/node_modules/stream-browserify/index.js',
    },
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};
