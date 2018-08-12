var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();

var scss_files = 'scss/**/*.scss';
var css_folder = 'css';
var css_files = css_folder + '/*.css';
var html_folder = 'html';
var html_files = html_folder + '/*.html';
var assets_folder = 'assets';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(scss_files)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(css_folder));
});

gulp.task('bs', function () {
  bs.init({
    server: {
      baseDir: [html_folder, css_folder, assets_folder],
      index: "index.html"
    },
    files: [html_files, css_files],
    notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch(scss_files, ['sass']);
});