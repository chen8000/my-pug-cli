

// require() 模块
const gulp = require('gulp');
const scss = require('gulp-sass');


// 定义一个任务
gulp.task('scss',() => {

    //去拿文件
    gulp.src('src/scss/*.scss')

        //执行编译文件的方法
        .pipe(scss())

        //把文件放到指定位置
        .pipe(gulp.dest('dist/style/'))
});


//当src目录下的文件发生改变时，就会执行后面中括号里default的任务
gulp.task('watch',()=>{
    gulp.watch('src/**',['default'])
});

//定义一个默认任务default 执行这个任务时，会执行后面中括号里的任务
gulp.task('default',['scss']);



