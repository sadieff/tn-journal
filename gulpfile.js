const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const reload = browserSync.reload;

const rootFolder = '/project/autodefect/';

function sprite(f) {
    var spriteData =
        gulp.src('./src/sprites/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: 'imgs/sprite.png',
                padding: 2
            }));
    spriteData.img.pipe(gulp.dest('./build/css/imgs/'));
    spriteData.css.pipe(gulp.dest('./src/scss/mixins/'));

    f();
}

exports.sprite = sprite;

function html(f) {
    gulp.src('./src/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('./build/')) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений

    f();
}

exports.html = html;

function dev(f) {
    gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', function (error) {
            console.log(error.toString());
            this.emit('end')
        })
        .pipe(autoprefixer())
        //.pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream: true}));

    f();
}

exports['css-dev'] = dev;

/* without sourcemap */
exports['css-build'] = function (f) {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream: true}));

    f();
};

function watch(f) {

	browserSync.init({
		server: {
			baseDir: "./build"
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
		logPrefix: "Gulp"
	});

    gulp.watch(['./src/*.html', './src/*/*.html'], html).on('change', browserSync.reload);
    gulp.watch(['./src/scss/*.scss', './src/scss/*/*.scss'], dev);
    gulp.watch(['./src/sprites/*.*'], sprite).on('change', browserSync.reload);

	gulp.watch("./src/*.html").on('change', browserSync.reload);

    f();
}

exports.watch = watch;
exports.default = watch;