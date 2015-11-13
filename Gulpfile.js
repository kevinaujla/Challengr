var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

var jsScripts = ['All javascript files that have to be concated in specific order'];

// the paths to our app files
var paths = {
  scripts: ['client/**/*.js', 'server/**/*.js', 'database/**/*.js', '!client/lib/**/*.js'],
  html: ['client/script/*.html'],
  styles: ['client/styles/main.css'],
  test: ['specs/**/*.js'],
  images: ['client/images/*']
};

gulp.task('build-js', function() {
  //specifc order
  return gulp.src(jsScripts)
    .pipe(concat('scripts.min.js', { newLine: '\n' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
    .pipe(filesize())
    .on('error', gutil.log);
}

// gulp.task('copy-css', function() {
//   gulp.src(paths.styles, { base : './client/styles' })
//     .pipe(gulp.dest('./build/styles'));
// });

// gulp.task('copy-images', function() {
//   gulp.src(paths.images, {
//       base: './client/images'
//     })
//     .pipe(gulp.dest('./build/images'));
// });

// gulp.task('copy-html', function() {
//   gulp.src(paths.html, { base: './client/' })
//     .pipe(gulp.dest('./build/'));
// });
// 

// JS Hinting
gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

// Concat All Client Script Files
gulp.task('scripts', function() {
  gulp.src(['./client/app.js', './client/script/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./client/'))
    .pipe(connect.reload());
});

// HTML Files
gulp.task('html', function () {
  gulp.src('./client/index.html')
    .pipe(connect.reload());
});

// Start a Web server using connect
gulp.task('connect', function () {
  connect.server({
    root: 'client',
    livereload: true
  });
});

// Sass
gulp.task('sass', function() {
  gulp.src('client/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/styles/main.css'));
});

gulp.task('styles', function() {
  return gulp.src('client/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/styles/main.css'));
});

gulp.task('watcher', function() {
  gulp.watch('client/styles/**/*.scss', ['sass']);
  gulp.watch('./client/script/**/*.js', ['jshint', 'scripts']);
});

// 
gulp.task('default', ['connect', 'watcher']);
