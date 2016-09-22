var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	notify = require("gulp-notify"),
	minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat');


var source_paths = {
  sass: './source/sass/**/app.scss',
  materialize_sass: './source/sass/**/materialize.scss',
  js: './source/js/**/*.js',
  html: './source/html/**/*.html',
}

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src(source_paths.sass)
      .pipe(sass({ errLogToConsole: true }))
      .pipe(concat('app.min.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('materialize_sass', function () {
  return gulp.src(source_paths.materialize_sass)
      .pipe(sass({ style: 'compressed',errLogToConsole: true }))
      .pipe(concat('materialize.min.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('livereload', function (){
  gulp.src('./dist/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(source_paths.sass, ['sass']);
  gulp.watch(source_paths.js, ['merge']);
  gulp.watch(source_paths.html, ['copy']);
  gulp.watch('./dist/**/*', ['livereload']);
});


gulp.task('copy', function() {
  return gulp.src(source_paths.html)
    .pipe(gulp.dest('./dist'));
})

gulp.task('merge', function() {
  return gulp.src(source_paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('default', ['connect', 'watch','materialize_sass', 'sass','copy','merge']);