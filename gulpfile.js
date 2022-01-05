//adiciona os plugins dos módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//função para compilar o SASS e os prefixos
function compilaSass() {
  return gulp
  .src('src/scss/**/*.scss')
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
  return gulp.src('src/js/main/**/*.js') //tenha o arquivo que gera loop - usar '!nomeFile.js'
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream())
}

//tarefa para concat
gulp.task('mainjs', gulpJS);

// JS Plugins
function pluginJS() {
  return gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'src/js/plugins/*.js'
  ])
  .pipe(concat('plugin.js'))
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream())
}

gulp.task('pluginsjs', pluginJS)
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
  gulp.watch('src/scss/**/*.scss', compilaSass);
  gulp.watch('src/js/main/**/*.js', gulpJS);
  gulp.watch('src/js/plugins/*.js', pluginJS);
  gulp.watch(['src/*.html']).on('change', browserSync.reload);
}

//inicia a tarefa de watch
gulp.task('watch', watch);

//tarefa padrão do Gulp
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginsjs'));
