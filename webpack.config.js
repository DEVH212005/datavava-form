const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx", // Entry point for TypeScript
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Allow importing .tsx and .ts files
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // to import index.html file inside index.js
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd',
  },
  devServer: {
    port: 4200, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // .ts and .tsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
};
