var path = require('path'),
	express = require('express'),
	webpack = require('webpack'),
	config = require('./webpack.dev.conf'),
	app = express();

var compiler = webpack(config);

app.use('/static', express.static(config.commonPath.staticDir));

// 数据Mock中间件
app.use(require(path.resolve(__dirname, '../server/do')));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false,
		children: false
	}
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler, {}));

app.listen(9000, '127.0.0.1', function(err) {
	err && console.log(err);
});
