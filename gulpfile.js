var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    minify = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

    var displayError = function(error) {
        // Initial building up of the error
        var errorString = '[' + error.plugin.error.bold + ']';
        errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
      
        // If the error contains the filename or line number add it to the string
        if(error.fileName)
            errorString += ' in ' + error.fileName;
      
        if(error.lineNumber)
            errorString += ' on line ' + error.lineNumber.bold;
      
        // This will output an error like the following:
        // [gulp-sass] error message in file_name on line 1
        console.error(errorString);
      };
      
      var onError = function(err) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Basso"
        })(err);
        this.emit('end');
      };

      var sassOptions = {
        outputStyle: 'expanded'
      };

      var prefixerOptions = {
        browsers: ['last 2 versions']
      };

      gulp.task('styles', function() {
        return gulp.src('sass/main.scss')
          .pipe(plumber({errorHandler: onError}))
          .pipe(sass(sassOptions))
          .pipe(prefix(prefixerOptions))
          .pipe(rename('main.css'))
          .pipe(gulp.dest('styles'))
      });

      gulp.task('min', function(){
        return gulp.src('styles/main.css')
            .pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init())
            .pipe(minify())
            .pipe(sourcemaps.write())
            .pipe(rename('main.min.css'))
            .pipe(gulp.dest('styles'));
      });

      gulp.task('watch', function() {
        gulp.watch('sass/partials/*.scss', ['styles']);
      });

      gulp.task('default', function(done){
        runSequence('styles', 'watch', done);
      });

      gulp.task('build', function(done) {
        runSequence('styles', done);
      });

      gulp.task('production-build', function(done){
        runSequence('styles', 'min', done)
      });
