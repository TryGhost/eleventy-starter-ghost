const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('css', function() {
  return gulp
    .src('src/_scss/**/*.scss')
    .pipe(
      sass({
        includePaths: ['node_modules']
      })
    )
    .pipe(gulp.dest('src/_includes/css'));
});

// Watch dependencies
gulp.task('watch', function() {
  gulp.watch('src/_scss/**.scss', gulp.parallel('css'));
});

// Build dependencies
gulp.task('build', gulp.parallel('css'));
