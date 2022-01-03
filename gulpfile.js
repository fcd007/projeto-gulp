const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function compilaSass() {
  return gulp
  .src('src/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })) //modo compresso
  //.pipe(sass()) //modo padrão de saída - espaços e lixo junto
  .pipe(gulp.dest('dist/css/'))
  .pipe(autoprefixer({
    cascade: false
  }))
}
//gulp.task("sass", compilaSass); //executar como $gulp sass
gulp.task('sass', compilaSass); // executa oomo padrão $ gulp

function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
}

gulp.task('default', watch);
