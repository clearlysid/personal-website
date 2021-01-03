const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

const baseFilename = isDev ? "index" : "index.[contenthash]";

module.exports = {
	mode: isDev ? "development" : "production",
	entry: [
		path.resolve(__dirname, "scripts", "main.js"),
		path.resolve(__dirname, "styles", "index.scss"),
	],
	output: {
		path: path.resolve(__dirname, "public", "assets"),
		filename: `${baseFilename}.js`,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader", // turns css into commonjs
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			},
		],
	},
	devtool: isDev ? "eval" : "source-map",
	plugins: [
		new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
		new ManifestPlugin({ publicPath: "/assets/" }),
	],
};
