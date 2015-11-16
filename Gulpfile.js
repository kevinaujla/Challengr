var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');

var jsScripts = ['All javascript files that have to be concated in specific order'];

// the paths to our app files
var paths = {
  scripts: ['client/**/*.js', 'server/**/*.js', 'database/**/*.js', '!client/lib/**/*.js'],
  html: ['client/script/*.html'],
  // styles: ['client/styles/main.css'],
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
});

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
    .pipe(jshint.reporter(stylish));
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
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('client/styles/'))
    .pipe(connect.reload());
});

// Autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src('./client/styles/main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./client/'));
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server/server.js', 
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

// Watcher
gulp.task('watcher', function() {
  gulp.watch('./client/styles/**/*.scss', ['sass', 'autoprefixer']);
  gulp.watch('./client/script/**/*.html', ['html']);
  gulp.watch('./client/index.html', ['html']);
  gulp.watch('./client/script/**/*.js', ['jshint', 'scripts']);
  gulp.watch('./client/app.js', ['jshint', 'scripts']);
});

// Run this command while developing
gulp.task('default', ['watcher', 'nodemon']);
