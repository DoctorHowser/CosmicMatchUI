var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify')

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('build', 'default')

gulp.task('default', ['buildJS', 'sass', 'copyAssets']);

gulp.task('buildJS', function() {
  return gulp.src('assets/**/*.js')
  .pipe(browserify())
    .pipe( gulp.dest('./www') );
});

gulp.task('copyAssets', function() {
  return gulp.src('assets/**/*.html')
    .pipe( gulp.dest('./www') );
});


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});
