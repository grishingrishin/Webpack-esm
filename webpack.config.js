import { fileURLToPath } from "url";
import { resolve, dirname } from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	mode: 'development',
	entry: './src/main.js',
	devServer: {
		static: {
			directory: resolve(__dirname, 'public'),
		},
		client: {
			overlay: true,
		},
		port: 6969,
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.scss$/,
				exclude: [/node_modules/],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }),
	],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'main.bundle.js',
	},
};
