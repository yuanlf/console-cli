var path = require('path'),
	webpack = require('webpack');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
	src = path.join(rootPath, 'src'), // 开发源码目录
	env = process.env.NODE_ENV.trim(); // 当前环境
var commonPath = {
	rootPath: rootPath,
	build: path.join(rootPath, 'build'), // build 后输出目录
	indexHTML: path.join(src, 'index.html'), // 入口基页
	staticDir: path.join(src, 'static') // 无需处理的静态资源目录
};

module.exports = {
	commonPath: commonPath,
	entry: {
		// 框架 / 类库 分离打包
		vendor: [
			'history',
			'lodash',
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-thunk'
		],
		app: path.join(src, 'scripts/app/app.js')
	},
	output: {
		path: path.join(commonPath.build, ''),
		publicPath: env === 'development'
			? '/build/'
			: './'
	},
	resolve: {
		extensions: [
			'', '.js', '.jsx'
		],
		alias: {
			CSS: path.join(src, 'css'),
			SCRIPTS: path.join(src, 'scripts')
		}
	},
	resolveLoader: {
		root: path.join(rootPath, 'node_modules')
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: (function() {
					var _loaders = ['babel?' + JSON.stringify({
							cacheDirectory: true,
							plugins: [
								'transform-runtime', 'transform-decorators-legacy'
							],
							presets: [
								'es2015', 'react', 'stage-0'
							]
						})];
					return _loaders;
				})(),
				include: src,
				exclude: /node_modules/
			}, {
				test: /\.json$/,
				loader: 'json'
			}, {
				test: /\.html$/,
				loader: 'html'
			}, {
				test: /\.(png|jpe?g|gif|svg)$/,
				loaders: [
					'url?' + JSON.stringify({
						limit: 10240, // 10KB 以下使用 base64
						name: 'img/[name].[ext]'
					}),
					'image-webpack'
				]
			}, {
				test: /\.(woff2?|eot|ttf|otf)$/,
				loader: 'url?limit=10000&name=fonts/[name].[ext]'
			}
		]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			__DEV__: env === 'development',
			__PROD__: env === 'production'
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		})
	]
};
