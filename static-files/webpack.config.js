const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SuppressChunksPlugin = require("suppress-chunks-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const dir = path.resolve(__dirname, "../wwwroot/");

module.exports = (env = {}, options = {}) => {
  const shouldBuildStaticSite = env.static === true;
  const isProduction = options.mode === "production";
  const shouldUseAnalyzer = env.analyzer === true;

  return {
    devServer: {
      disableHostCheck: true,
      inline: false
    },
    devtool: "source-map",
    entry: () => {
      const entries = {
        style: "./src/scss/style.scss"
      };
      if (shouldBuildStaticSite) {
        entries.client = ["./src/static-site/static-client.tsx"];
        entries.server = "./src/static-site/static-server.tsx";
      } else {
        entries.client = [
          "expose-loader?ReactDOM!react-dom",
          "expose-loader?Components!./src/app.components.tsx"
        ];
        entries.server = [
          "expose-loader?React!react",
          "expose-loader?ReactDOM!react-dom",
          "expose-loader?ReactDOMServer!react-dom/server",
          "expose-loader?Components!./src/app.components.tsx"
        ];
      }
      return entries;
    },
    output: (() => {
      const output = {
        path: dir,
        filename: "[name].[chunkhash].js"
      };

      if (shouldBuildStaticSite) {
        output.libraryTarget = "umd";
        output.globalObject = "this";
      }

      return output;
    })(),
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      modules: ["node_modules", path.resolve(__dirname)],
      alias: {
        components: path.resolve("./src/components"),
        assets: path.resolve("./src/assets")
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname),
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            onlyCompileBundledFiles: true
          }
        },
        {
          test: /\.module.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: true
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /(style.scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: false,
                sourceMap: true
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader"
            }
          ]
        },
        {
          loader: "@svgr/webpack",
          test: /\.svg$/,
          options: {
            publicPath: "/",
            name: "[name].[ext]?[hash]"
          }
        },
        {
          loader: "file-loader",
          test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          options: {
            publicPath: "/",
            name: "[name].[ext]?[hash]"
          }
        },
        {
          loader: "file-loader",
          test: /\.(ttf|ico|eot|woff)(\?.*)?$/,
          options: {
            publicPath: "/"
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),
      new ManifestPlugin(),
      new SuppressChunksPlugin(
        [
          {
            name: "style",
            match: /\.js(.map)?$/
          }
        ].concat(shouldBuildStaticSite ? [] : [])
      )
    ]
      .concat(
        shouldBuildStaticSite
          ? [
              new StaticSiteGeneratorPlugin({
                entry: "server",
                locals: {
                  isProduction
                },
                paths: require("./src/static-site/paths.tsx")
              }),
              new CopyWebpackPlugin(
                [
                  {
                    from: "src/static-site/assets",
                    to: "static-site/assets"
                  },
                  {
                    from: "src/static-site/api",
                    to: "static-site/api"
                  }
                ],
                { copyUnmodified: true }
              )
            ]
          : []
      )
      .concat(shouldUseAnalyzer ? [new BundleAnalyzerPlugin()] : []),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: module => {
              if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
                return false;
              }

              return module.context && module.context.includes("node_modules");
            },
            chunks: chunk => chunk.name === "client",
            name: "vendor"
          }
        }
      }
    }
  };
};
