var gulp = require('gulp');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var strip = require('gulp-strip-comments');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var del = require('del');
var runSequence = require('run-sequence');

var paths = {
	scripts: 'src/**/*.js',
	html: [
	'./src/**/*.html',
	'!./src/index.html'
	],
	css: './src/css',
	index: './src/index.html',
	dist: './dist/'
};

// Build

gulp.task('clean', function(){
	return del(paths.dist);
});

gulp.task('htmlmin', function(){
	return gulp.src( paths.html )
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest( paths.dist ));
});

gulp.task('usemin', function(){
	return gulp.src( paths.index )
		.pipe(usemin({
			css: [ minifyCss(), 'concat' ],
			js: [ strip(), babel({presets: ['es2015']}), ngmin(), uglify() ]
		}))
		.pipe(gulp.dest( paths.dist ));
});

gulp.task('indexmin', function(){
	return gulp.src( paths.dist+'index.html' )
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest( paths.dist ));
});

gulp.task('build', function(){
	runSequence(
		'clean',
		'htmlmin',
		'usemin',
		'indexmin'
		);
});










