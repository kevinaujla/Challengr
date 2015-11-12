var gulp = require("gulp");
var jshint = require("gulp-jshint");
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsScripts = ["All javascript files that have to be concated"];

// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/src/**/*.js'],
  html: ['client/src/**/*.html'],
  styles: ['client/styles/*.css'],
  test: ['specs/**/*.js'],
  images: ['client/images/*']
};

gulp.task("jshint", function() {
  return gulp.src("jsfile.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter("fail"));
});

gulp.task('styles', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/styles.css'));
});

gulp.task('build-js', function() {
  //specifc order
  return gulp.src(jsScripts)
    .pipe(concat('ourfile.min.js', {
      newLine: '\n'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
    .pipe(filesize())
    .on('error', gutil.log);
});

gulp.task('copy-css', function() {
  gulp.src(paths.styles, {
      base: './client/styles'
    })
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('copy-images', function() {
  gulp.src(paths.images, {
      base: './client/images'
    })
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copy-html', function() {
  gulp.src(paths.html, {
      base: './client/'
    })
    .pipe(gulp.dest('./build/'));
});

gulp.task("watch", function() {
  gulp.watch("filename", ["task", "jshint"]);
  gulp.watch("stylesFileName", ["styles"]);
});