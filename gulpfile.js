var gulp = require('gulp')
,   sourcemaps = require('gulp-sourcemaps')
,   sass = require('gulp-sass')
,   concat = require('gulp-concat')
,   Cachebuster = require('gulp-cachebust')
,   print = require('gulp-print')
,   babel = require('gulp-babel')
,   uglify = require('gulp-uglify')
,   cachebust = new Cachebuster();


gulp.task('build-css', function(){
  return gulp.src('./styles/*')
      // Step 1:
      .pipe(sourcemaps.init())
      // Step 2:
      .pipe(sass())
      // Step 3:
      .pipe(cachebust.resources())
      // Step 4:
      .pipe(concat('styles.css'))
      // Step 5:
      .pipe(sourcemaps.write('./maps'))
      // Step 6:
      .pipe(gulp.dest('./dist'));
})

gulp.task('build-js', function() {
  // Step 1:
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(print())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    // Note: Only uncomment uglify when ready for produciton:
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});
