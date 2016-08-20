var gulp = require('gulp');
// var reactify = require('reactify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

// var paths= {
// 	script:('src/js/**/*.js')
// }
gulp.task('js', function () {
	return gulp.src('src/js/**/*.js')
	// gulp.src(paths)
	.pipe(uglify())
	// .pipe(concat(js/all.main.js))
	.pipe(gulp.dest('js'))
	console.log('okjs')
});

gulp.task('sass' , function(){
     return gulp.src('src/sass/**/*.scss')
     .pipe(sass())
     .pipe(gulp.dest('css'));
     console.log("oksass")
})



// gulp.task('default', function () {
// 	var b = browserify({
// 	    entries: './js/comments.js',
// 	    debug: true,
// 	    transform: [reactify]
// 	    })
// })



gulp.task('pc',['sass','js'], function() {
     console.log('ok')
});








