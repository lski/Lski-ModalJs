var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jeditor = require("gulp-json-editor"),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifycss = require('gulp-minify-css'),
    projectName = 'lski-modal',
    versionNo = "1.1.2",
    insertVersionNo = ('/*! ' + projectName + ' - ' + versionNo + ' */\n');

gulp.task('clean', function(cb) {
    del('dist', cb);
});

gulp.task('version', function() {

    return gulp.src("./*.json")
        .pipe(jeditor({
            version: versionNo,
            name: projectName
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('js', function() {

    return gulp.src('src/*.js')
        .pipe(concat('lski-modal.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(insert.prepend(insertVersionNo))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {

    return gulp.src('src/*.css')
        .pipe(concat('lski-modal.css'))
        .pipe(insert.prepend(insertVersionNo))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'version'], function() {
    gulp.start('js', 'css');
});