

// require() 模块
const gulp = require('gulp');
const scss = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

//定义一个html任务
gulp.task('html',()=>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
});

// 定义一个scss任务
gulp.task('sass',() => {

    //去拿文件
    gulp.src('src/scss/*.scss')

        //执行编译文件的方法
        .pipe(scss())

        //把文件放到指定位置
        .pipe(gulp.dest('dist/style/'))
        
        //文件更新后推送到浏览器，实时刷新
        .pipe(reload({stream: true}));
});

// 定义一个babel任务，
gulp.task('babel',()=>{
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets:['env']
        }))
        .pipe(gulp.dest('dist/js/'))

        .pipe(reload({stream: true}));
});

//定义browserSync任务
//静态服务器
gulp.task("serve",['default'],()=>{
    browserSync.init({
        server:{
            baseDir: "./dist"
        }
    });
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/js/*.js',['babel']);
    gulp.watch('src/*.html',['html']).on('change',reload);
});

//定义删除任务,删除dist文件，起到清除缓存的作用
gulp.task('clean',del.bind(null, ['dist']));

//定义一个默认任务default 执行这个任务时，会执行后面中括号里的任务
gulp.task('default',['html','sass','babel']);



