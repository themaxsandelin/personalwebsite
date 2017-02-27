const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

gulp.task('javascript', () => {
  return gulp.src('./src/javascript/max.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('sass', () => {
  return gulp.src(['./src/sass/max.scss', './src/sass/lost.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 version']
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/sass/max.scss', './src/sass/max.scss'], ['sass']);
  gulp.watch('./src/javascript/max.js', ['javascript']);
});

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: 'localhost:8080'
  });
});

gulp.task('default', ['javascript', 'sass', 'watch', 'browser-sync']);