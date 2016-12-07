"use strict";

const glob = require("glob");
const fs = require("fs");

function cleanModuleCache(module) {
	if (require.cache[module]) {
		delete require.cache[module];
	}
}

const renderI18n = (file, config) => {
	let messages = {};
	config = config || {};
	const moduleName = config.moduleName || "CDN";
	const filePath = config.filePath || "./src/static/i18n/";
	const langs = config.langs || ["en", "zh", "ja"];

	for (let lang of langs) {
		messages[lang] = {};
	}

	const render = (fs, prex, messages) => {
		if (fs && typeof fs === "object") {
			const keys = Object.keys(fs);

			for (let key of keys) {
				let _val = fs[key];
				let _ll;

				if (prex != '') {
					_ll = prex + '.' + key;
				} else {
					_ll = key;
				}

				// 至少需要包含【中文】版本的翻译
				if (_val && _val["zh"]) {
					for (let lang of langs) {
						if (_val[lang]) {
							messages[lang][_ll] = _val[lang];
						}
					}
				} else {
					render(_val, _ll, messages);
				}
			}
		}
	};

	const renderFile = (file) => {
		let fsChunk = require(file);
		let messageGlobalVarName = 'ALIYUN_' + moduleName + '_CONSOLE_MESSAGE';
		render(fsChunk, "", messages);

		for (let lang of langs) {
			let messageOutput = messageGlobalVarName + " = " + JSON.stringify(messages[lang], undefined, 2);
			let fPath = filePath + '/messages' + "_" + lang + '.js';

			fs.writeFileSync(fPath, messageOutput);
		}
	}

	if (file) {
		renderFile(file)
	}

};

module.exports = {
	render: renderI18n
}
