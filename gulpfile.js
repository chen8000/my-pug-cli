// require() 模块
const gulp = require('gulp');
const scss = require('gulp-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


// pug [页面单独的pug]
gulp.task('pug',()=>{
    gulp.src('src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});
// scss [页面单独的scss]
gulp.task('scss',() => {

    //去拿文件
    gulp.src('src/**/scss/*.scss')

        //执行编译文件的方法
        .pipe(scss())

        //把文件放到指定位置
        .pipe(gulp.dest('dist/'))
        
        //文件更新后推送到浏览器，实时刷新
        .pipe(reload({stream: true}));
});

// babel [页面单独的js]
gulp.task('babel',()=>{
    gulp.src('src/**/js/*.js')
        .pipe(babel({
            presets:['env']
        }))
        .pipe(gulp.dest('dist/'))

        .pipe(reload({stream: true}));
});

//img
gulp.task('img',()=>{
    gulp.src('src/**/images/*')
        .pipe(gulp.dest('dist/'))
})


// =========================   common
// common fonts
gulp.task('commonFonts',()=>{
    gulp.src('src/common/fonts/*')
        .pipe(gulp.dest('dist/common/fonts/'))
});
// babel
gulp.task('commonBabel',()=>{
    gulp.src('src/common/js/*.js')
        .pipe(babel({
            presets:['env']
        }))
        .pipe(gulp.dest('dist/common/js/'))
        .pipe(reload({stream: true}));
});
//sass
gulp.task('commonScss',()=>{
    gulp.src('src/common/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/common/css/'))
        .pipe(reload({stream: true}));
});
//pug
gulp.task('commonPug',()=>{
    gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});
//images
gulp.task('commonImg',()=>{
    gulp.src('src/common/images/*')
        .pipe(gulp.dest('dist/common/images/'))
});
//headfoot
gulp.task('headFootPug',()=>{
    gulp.src('src/headfoot/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/headfoot/'))
})

//定义browserSync任务
//静态服务器
gulp.task("serve",['default'],function (){
    browserSync.init({
        server:{
            baseDir: "./dist"
        }
    });

    //监听独立页面
    gulp.watch('src/**/scss/*.scss',['scss']);
    gulp.watch('src/**/js/*.js',['babel']);
    gulp.watch('src/**/images/*',['img']);
    gulp.watch('src/**/*.pug',['pug']);

    //common
    gulp.watch('src/common/headfoot/*.pug',['headFootPug']);
    gulp.watch('src/common/images/*',['commonImg']);
    gulp.watch('src/common/js/*.js',['commonBabel']);
    gulp.watch('src/common/scss/*.scss',['commonScss']);
    gulp.watch('src/*.pug',['commonPug']);
    gulp.watch('src/common/fonts/*',['commonFonts']);

    // gulp.watch('./src/**').on('change',reload);

});

//定义删除任务,删除dist文件，起到清除缓存的作用
gulp.task('clean',del.bind(null, ['dist']));

//定义一个默认任务default 执行这个任务时，会执行后面中括号里的任务
gulp.task('default',[
    'scss',
    'babel',
    'pug',
    'img',
    'headFootPug',
    'commonScss',
    'commonBabel',
    'commonPug',
    'commonImg',
    'commonFonts'
]);



