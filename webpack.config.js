const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // сопоставляет файлы .js, .ts, и .tsx
        loader: "babel-loader", // использует для указанных типов файлов загрузчик babel-loader (ts-loader не требуется).
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // сопоставляет только файлы .css (т.е. не .scss и др.)
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: "./public",
    port: 3000,
  },
  output: {
    filename: "bundle.js", // выходной бандл
    path: path.resolve(__dirname, "public"),
    clean: true,
    publicPath: "/",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()], // used for hot reloading when developing
  devtool: "inline-source-map", // создает высококачественные карты кода
};
