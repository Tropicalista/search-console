const gulp = require('gulp');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const del = require('del');

var files = [
  './includes/**/*.*',
  './freemius/**/*.*',
  './languages/**/*.*',
  './vendor/**/*.*',
  './assets/css/**/*.*',
  './assets/font/**/*.*',
  './assets/js/app.js',
  './assets/js/chunk-vendors.js',
  './search-console.php',
  './README.txt',
];

gulp.task('distribute', function() {
  return gulp.src(files , { base: './' })
    .pipe(gulp.dest('dist'));
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src([
  	'./assets/js/gsc_table.js',
  	'./assets/js/gsc_widget.js'
  	])
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./dist/assets/js'))
});

gulp.task('zip', function () {
    return gulp.src('./dist/**')
        .pipe(zip('searchconsole.zip'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(){
	return del(['./dist/**', '!./dist']);
});

gulp.task('build', gulp.series( 'clean', 'distribute', 'scripts', 'zip'));
