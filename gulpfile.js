var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifycss = require('gulp-minify-css');

gulp.task('clean', function(cb) {
    del('dist', cb);
});

gulp.task('js', function() {

    return gulp.src('src/*.js')
        .pipe(concat('lski-modal.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {

    return gulp.src('src/*.css')
        .pipe(concat('lski-modal.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});
              
gulp.task('default', ['clean'], function() {
    gulp.start('js', 'css');
});