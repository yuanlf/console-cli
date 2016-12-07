var options = {
	port: 3009,
	database: 'mock2easy',
	doc: 'doc',
	ignoreField: [],
	interfaceSuffix: '.json',
	preferredLanguage: 'en'
};
var mock2easy = require('mock2easy');

module.exports = function() {
	mock2easy(options, function(app) {
		try {
			app.listen(options.port, function() {
				console.log(('mock2easy is starting , please visit : http://localhost:' + options.port).bold.cyan);
			});
		} catch (e) {
			console.log(e);
		}
	});
}
