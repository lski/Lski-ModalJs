var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jeditor = require("gulp-json-editor"),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifycss = require('gulp-minify-css'),
    projectName = 'lski-request',
    versionNo = "1.0.1",
    insertVersionNo = ('/*!\n * ' + projectName + ' - ' + versionNo + '\n*/\n');

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
        .pipe(insert.prepend(insertVersionNo))
        .pipe(uglify({ preserveComments: 'some' }))
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