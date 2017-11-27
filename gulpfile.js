/**
 * Gulp Modules
 */
const gulp          = require('gulp'),
      plumber       = require('gulp-plumber'),
      newer         = require('gulp-newer'),
      uglify        = require('gulp-uglifyes'),
      jshint        = require('gulp-jshint'),
      rename        = require('gulp-rename'),
      sourcemaps    = require('gulp-sourcemaps'),
      include       = require("gulp-include"),
      notify        = require('gulp-notify'),


      // folder ref
      folder = {
        src: 'src/',
        build: 'dist/'
};

/**
 * JavaScript
 */
gulp.task('js', () => {

  var onError = function(err) {
    notify.onError({
      title:    "JS Error",
      subtitle: "Nah Bruv!",
      message:  "Error: <%= error.message %>",
      sound:    "Beep"
    })(err);

    this.emit('end');
  };

  return gulp.src(folder.src + 'index.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(include())
    .pipe (uglify ({
      mangle: true,
      compress: true,
      output: { beautify: false }
    }))
    .pipe(rename({ basename: 'sticky-nav', suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(folder.build));
});



/**
 * JS Hint
 */
gulp.task('jshint', () => {
  var onError = function(err) {
    notify.onError({
      title:    "JS Error",
      subtitle: "JS Hint!",
      message:  "Error: <%= error.message %>",
      sound:    "Beep"
    })(err);

    this.emit('end');
  };
  gulp.src(folder.src + '*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(plumber({errorHandler: onError}));
});



/**
 * Runner
 */
gulp.task('run', ['js', 'jshint']);


/**
 * Watcher
 */
gulp.task('watch', function() {
  gulp.watch(folder.src + 'scss/**/*', ['scss']);
  gulp.watch(folder.src + 'js/**/*', ['js']);
});

/**
 * Gulp Go
 */
gulp.task('default', ['run', 'watch']);
