const gulp = require('gulp');
const gzip = require('gulp-gzip');

gulp.task('compress', () => {
  gulp
    .src(['./dist/*.js', './dist/*.css'])
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});
