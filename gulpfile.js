// Stock l'objet gulp
var gulp = require('gulp');
// Stock l'objet sass
var sass = require('gulp-sass');
// Permet d'ajouter des prefixes en css 
// ex : transform: scale(2) =-moz-transform: scale(2);-webkit-transform: scale(2);
var autoprefixer = require('gulp-autoprefixer');
// Merge JS Files
var useref = require('gulp-useref');
// Add if support
var gulpif = require('gulp-if');
// Minify JS
var uglify = require('gulp-uglify');
// Minify CSS
var minifyCSS = require('gulp-minify-css');
// Refresh browser on save
var browserSync = require('browser-sync');
// Get error information with uglify
var gutil = require('gulp-util');
// Call function in order
var runSequence = require('run-sequence');


var sassOption = {
  errLogToConsole: true, 
  outputStyle: 'expanded'
};

//Compile SCSS files
// Permet de creer une tache(ressemble a une fonction) le premier parametre est le nom de la tache
// et permet d'etre appeler dans la console ex gulp sass
gulp.task('sass', function() {
  return gulp.src('css/scss/*.scss')
  .pipe(autoprefixer())
  .pipe(sass(sassOption).on('error', sass.logError))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

//Read HTML file to merge CSS and JS than minify them
gulp.task('useref', function(){

  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minifyCSS({shorthandCompacting:false}).on('error', gutil.log)))
    .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
    .pipe(gulp.dest('web'));
});

// Permet de rafraichir la page des modification du sass
gulp.task('browserSync', function() {
  browserSync({
    proxy: 'http://127.0.0.1/e-paySpace/index.html'
  })
});

// Permet d'observer chaque modification dans les ficher .scss
// en cas de changement la tache sass sera appeler
gulp.task('watch',function() {
  gulp.watch('css/scss/*.scss',['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});

//Run sequence to build web folder
gulp.task('build', function(callback){
  runSequence('sass', ['useref'], callback);
});

// Cette tache s'appel default permet d'etre lancé en tapant la commande gulp
// les tache entre crochet permet de lancer en même temps
gulp.task('default', function(callback){
  runSequence(['browserSync','watch'],callback);
});