const path = require('path')

const { NODE_ENV } = process.env

const INPUT_PATH = path.resolve(__dirname, 'src')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
  mode: NODE_ENV,
  entry: {
    index: INPUT_PATH,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [INPUT_PATH],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'esnext',
            },
          },
        ],
      },
    ],
  },
}
