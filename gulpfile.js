const gulp = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('js', () => {
  return gulp.src('./src/js/max.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
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
  gulp.watch('./src/js/max.js', ['js']);
});

gulp.task('dev', ['js', 'sass', 'watch']);
gulp.task('default', ['js', 'sass']);