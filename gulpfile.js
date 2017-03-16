/*jshint esversion:6 */
let gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('html',()=>{
	gulp.src('./*.html')
		.pipe(livereload());
});

gulp.task('js',()=>{
	gulp.src('./assets/js/*.js').
		pipe(livereload());
});

gulp.task('sass', function () {
 return gulp.src('./assets/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
                {
                    browsers: [                        
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
  .pipe(sourcemaps.write('./maps')).pipe(gulp.dest('./assets/'))
  .pipe(livereload());
});


gulp.task('watch',()=>{
	livereload.listen();
	gulp.watch('./*.html',['html']);
	gulp.watch('./assets/js/*.js',['js']);
	gulp.watch('./**/*.scss',['sass']);
	console.log('Watching files....');

});