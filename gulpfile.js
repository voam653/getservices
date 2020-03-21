const { src, dest, watch, series } = require('gulp');
const debug = require('gulp-debug');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const map = require('map-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Compile error: <%= error.message %>'
  })
};

const exitOnJshintError = map(function(file, callback) {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});

function server() {
  browserSync.init({
    server: './src/client'
  });
}

function sassCompile() {
  return src('./src/client/styles/*.sass')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/client/dist/css'))
    .pipe(debug({ title: 'CSS compiled:' }));
}

function jsCompile() {
  return src('./src/client/views/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(exitOnJshintError)
    .pipe(concat('_bundle.js'))
    .pipe(dest('./src/client/dist/js'));
}

function fontsCompile() {
  return src('./src/client/assets/fonts/**/*.{ttf,woff,eof,otf}')
    .pipe(dest('./src/client/dist/assets/fonts/'))
    .pipe(debug({ title: 'Fonts compiled:' }));
}

function changeListener() {
  const watcher = watch([
    './src/client/**/*.sass',
    './src/client/**/*.scss',
    './src/**/*.html'
  ]);

  watcher.on('change', function(path, stats) {
    const fileType = path.split('.')[1];
    console.log(
      `File ${path} was changed | Type: ${fileType} | Stats: ${stats}`
    );

    if (fileType === 'html') {
      browserSync.reload();
    }

    if (fileType === 'sass' || fileType === 'scss') {
      sassCompile().pipe(browserSync.stream());
    }
  });

  watcher.on('add', function(path, stats) {
    console.log(`File ${path} was added | Stats: ${stats}`);
  });

  watcher.on('unlink', function(path, stats) {
    console.log(`File ${path} was removed | Stats: ${stats}`);
  });

  server();
}

exports.jsCompile = jsCompile;
exports.sassCompile = sassCompile;
exports.fontsCompile = fontsCompile;
exports.default = series(sassCompile, changeListener);
