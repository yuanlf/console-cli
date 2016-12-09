var webpack = require('webpack'),
	config = require('./webpack.base.conf'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	NyanProgressPlugin = require('nyan-progress-webpack-plugin'),
	SOURCE_MAP = false;

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP
	? 'source-map'
	: false;

// 生产环境下分离出 CSS 文件
config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css')
}, {
	test: /\.less$/,
	loader: ExtractTextPlugin.extract('style', 'css!less')
}, {
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style', 'css!sass')
});

config.plugins.push(
	new NyanProgressPlugin(), // 进度条
  new CleanWebpackPlugin('build', {
    root: config.commonPath.rootPath,
    verbose: false
  }),
  new CopyWebpackPlugin([ // 复制静态资源
    {
      from: config.commonPath.staticDir,
      ignore: ['*.md', 'dict.js']
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    // 公共代码分离打包
    names: ['vendor', 'mainifest']
  }),
  new ExtractTextPlugin('[name].css', {
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: config.commonPath.indexHTML,
    chunksSortMode: 'none',
		minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true
    }
  })
);

module.exports = config;
