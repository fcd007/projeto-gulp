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
  .pipe(gulp.dest('src/css/'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulp.dest('dist'))
}

//gulp.task("sass", compilaSass); //executar como $gulp sass
gulp.task('default', compilaSass); // executa oomo padrão $ gulp