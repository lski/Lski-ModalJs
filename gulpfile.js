const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jeditor = require("gulp-json-editor"),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    del = require('del'),
    cssnano = require('gulp-cssnano'),
    settings = {
        name: 'lski-modal',
        version: "1.1.2"
    },
    insertVersionNo = '/*! ' + settings.name + '-' + settings.version + ' */\n';

gulp.task('clean', (cb) => {
    return del('dist');
});

gulp.task('version', () => {

    return gulp.src("./*.json")
        .pipe(jeditor(settings))
        .pipe(gulp.dest('./'));
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

gulp.task('default', ['clean', 'version'], () => {
    gulp.start('js', 'css');
});