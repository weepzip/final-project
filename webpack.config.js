const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.tsx"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/, // сопоставляет файлы .js, .ts, и .tsx
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        }, // использует для указанных типов файлов загрузчик babel-loader (ts-loader не требуется).
        exclude: /node_modules/,
      },
      {
        test: /\.[jt]sx?$/, // сопоставляет файлы .js, .ts, и .tsx
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
        }, // использует для указанных типов файлов загрузчик babel-loader (ts-loader не требуется).
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // сопоставляет только файлы .css (т.е. не .scss и др.)
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.module.css$/,
        use: [
          "css-loader",
          {
            options: {
              esModule: true, // Говорим о том, что хотим использовать ES Modules
              modules: {
                namedExport: true, // Указываем, что предпочитаем именованый экспорт дефолтному
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].hash.js", // выходной бандл
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "/",
  },
  devServer: {
    static: "/dist/",
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
  ], // used for hot reloading when developing
  devtool: "inline-source-map", // создает высококачественные карты кода
};
