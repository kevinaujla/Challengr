var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var autoprefixer = require('gulp-autoprefixer');
var sequence = require('run-sequence');

// the paths to our app files
var paths = {
  scripts: ['client/**/*.js', 'server/**/*.js', 'database/**/*.js', '!client/lib/**/*.js']
};

// deployment build
gulp.task('build', function (cb) {
  sequence('scripts', 'sass', 'autoprefixer');
});

// JS Hinting
gulp.task('jshint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Concat All Client Script Files
gulp.task('scripts', function () {
  gulp.src(['./client/app.js', './client/script/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./client/'))
});

// Sass
gulp.task('sass', function () {
  gulp.src('client/styles/main.scss')
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('client/styles/'))
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

gulp.task('nodemon', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

// Watcher
gulp.task('watcher', function () {
  gulp.watch('./client/styles/**/*.scss', ['sass', 'autoprefixer']);
  gulp.watch('./client/script/**/*.js', ['scripts']);
  gulp.watch('./client/app.js', ['scripts']);
});

// Run this command while developing
gulp.task('default', ['watcher', 'sass', 'autoprefixer', 'scripts', 'nodemon']);
