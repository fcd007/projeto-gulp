//adiciona os plugins dos módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

//função para compilar o SASS e os prefixos
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
//tarefa de Gulp para a função de SASS
gulp.task('sass', compilaSass); // executa oomo padrão $ gulp

//função para juntar arquivos .js
function gulpJS() {
  return gulp.src('src/js/main/*.js') //tenha o arquivo que gera loop - usar '!nomeFile.js'
  .pipe(concat('main.js'))
  .pipe(gulp.dest('src/js'))
}

//tarefa para concat
gulp.task('mainjs', gulpJS);

//função para inicia ro browser
function browser() {
  browserSync.init( {
    server: {
      baseDir: './src'
    }
  });
}

//tarefa do browser-sync
gulp.task('browser-sync', browser);

//função de watch do Gulp
function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
  gulp.watch(['src/*.html']).on('change', browserSync.reload);
  gulp.watch('src/js/main/*.js', gulpJS);
}

//inicia a tarefa de watch
gulp.task('watch', watch);

//tarefa padrão do Gulp
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
