const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
var webpack = require('webpack')

var loadingRules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader'
    ]
  }

]



module.exports = {
	entry: {
		index: './websrc/index.js',
	},
	output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
		path: path.resolve(__dirname) + "/web/",
    library: 'functions',
	},
	mode: 'development',
	// mode: 'production',
	resolve: { alias: { vue: 'vue/dist/vue.esm-bundler.js' } },
	module: {
		rules: loadingRules
	},
  devServer: {
    watchFiles: ['websrc/*.js', 'websrc/*.vue','websrc/index.html'],
  },
	plugins: [
    new HtmlWebpackPlugin({
    	template: 'websrc/index.html'
    }),
    new VueLoaderPlugin(),
  ],
	optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: 'all',
		},
	},
};



