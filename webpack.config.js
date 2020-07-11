const HTMLWebpackPlugin = require("html-webpack-plugin")
const { ProgressPlugin } = require("webpack")

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				// exclude: "/node_modules/"
			},
			{
				test: /\.(png|mp3)$/,
				use: [ "file-loader" ],
			},
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ]
			}
		]
	},
	plugins: [
		new ProgressPlugin,
		// new CleanWebpackPlugin,
		new HTMLWebpackPlugin({ title: "GMTK Game Jam 2020" })
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
}
