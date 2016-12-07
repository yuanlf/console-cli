const gulp = require('gulp');
const path = require('path');
const i18nHelper = require('./server/i18nHelper');
const rootPath = path.resolve(__dirname, '.'); // 项目根目录
const src = path.join(rootPath, 'src'); // 开发源码目录
const distPath = path.join(src, 'static/i18n/src/dict.js'); // 字典文件路径

function cleanModuleCache(module) {
  if(require.cache[module]) {
    delete require.cache[module];
  }
}

gulp.task('compileI18nFile', function () {
  i18nHelper.render(distPath);
})

// watch字典文件
gulp.task('watchI18nFile', function () {
  gulp.watch(distPath, function(file) {
    // 先清除缓存模块
    cleanModuleCache(file.path);

    i18nHelper.render(file.path);
  });
});

gulp.task('default', ['compileI18nFile', 'watchI18nFile'])
