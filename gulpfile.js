var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('serve', function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("scss/attendance-calendar.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'serve']);