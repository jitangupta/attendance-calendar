"use strict";

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  ts = require('gulp-typescript'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

// Clean task
gulp.task('clean', function() {
  return del(['dist']);
});

// Compile SCSS(SASS) files
gulp.task('scss', function() {
  return gulp.src(['./scss/*.scss'])
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
});

// Minify CSS
gulp.task('css:minify', gulp.series('scss', function cssMinify() {
  return gulp.src("./dist/css/attendance-calendar.css")
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}));

//Transpile Typescript files
gulp.task('ts',function(){
    return gulp.src(['./ts/*.ts'])
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'attendance-calendar.js'
    }))
    .pipe(gulp.dest('./dist/js'));
});

// Minify Js
gulp.task('js:minify', gulp.series('ts',function () {
  return gulp.src([
    './dist/js/attendance-calendar.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}));

// // Replace HTML block for Js and Css file upon build and copy to /dist
// gulp.task('replaceHtmlBlock', function () {
//   return gulp.src(['*.html'])
//     .pipe(htmlreplace({
//       'js': 'assets/js/app.min.js',
//       'css': 'assets/css/app.min.css'
//     }))
//     .pipe(gulp.dest('dist/'));
// });

// Configure the browserSync task and watch file path for change
gulp.task('dev', function browserDev(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['scss/*.scss','scss/**/*.scss'], gulp.series('css:minify', function cssBrowserReload (done) {
    browserSync.reload();
    done(); //Async callback for completion.
  }));
  gulp.watch('ts/attendance-calendar.ts', gulp.series('ts', function jsBrowserReload (done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(['*.html']).on('change', browserSync.reload);
  done();
});

// Build task
gulp.task("build", gulp.series(gulp.parallel('css:minify','js:minify')));

// Default task
gulp.task("default", gulp.series("clean", 'build')); //, 'replaceHtmlBlock'