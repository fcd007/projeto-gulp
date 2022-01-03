const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function compilaSass() {
  return gulp
  .src('src/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })) //modo compresso
  //.pipe(sass()) //modo padrão de saída - espaços e lixo junto
  .pipe(gulp.dest('src/css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(browserSync.stream());
}
//gulp.task("sass", compilaSass); //executar como $gulp sass
gulp.task('sass', compilaSass); // executa oomo padrão $ gulp

function browser() {
  browserSync.init( {
    server: {
      baseDir: './src'
    }
  });
}

gulp.task('browser-sync', browser);

function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
