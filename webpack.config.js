const path = require('path');

module.exports = {
  entry: './src/main.js', // точка входа
  output: {
    filename: 'bundle.js', // файл сборки
    path: path.resolve(__dirname, 'public'), // директория для сборки
  },
  devtool: 'source-map'
};