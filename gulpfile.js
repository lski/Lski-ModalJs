const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    del = require('del'),
    cssnano = require('gulp-cssnano'),
	settings = require('./package.json')
    insertVersionNo = '/*! ' + settings.name + '-' + settings.version + ' */\n';

gulp.task('clean', (cb) => {
    return del('dist');
});

gulp.task('js', () => {

    return gulp.src('src/*.js')
        .pipe(concat('lski-modal.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(insert.prepend(insertVersionNo))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {

    return gulp.src('src/*.css')
        .pipe(concat('lski-modal.css'))
        .pipe(insert.prepend(insertVersionNo))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], () => {
    gulp.start('js', 'css');
});