var webpack = require('webpack'),
	config = require('./webpack.base.conf'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	OpenBrowserPlugin = require('open-browser-webpack-express-plugin'),
	DashboardPlugin = require('webpack-dashboard/plugin'),
	SOURCE_MAP = false;

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';
config.output.publicPath = '/';

config.devtool = SOURCE_MAP
	? 'source-map'
	: false;

// add hot-reload related code to entry chunk
config.entry.app = ['webpack-hot-middleware/client?reload=true', config.entry.app];

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.loaders.push({
	test: /\.css$/,
	loader: 'style!css'
}, {
	test: /\.less$/,
	loader: 'style!css!less'
}, {
	test: /\.scss$/,
	loader: 'style!css!sass'
});

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new ExtractTextPlugin('[name].css'), new DashboardPlugin(), new HtmlWebpackPlugin({filename: 'index.html', template: config.commonPath.indexHTML, chunksSortMode: 'none'}), new OpenBrowserPlugin({url: 'http://localhost:9000/'}));

// 启动mock服务
const mock2easy = require('../server/mock2easy');
mock2easy();

module.exports = config;
