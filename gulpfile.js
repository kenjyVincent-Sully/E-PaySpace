// Stock l'objet gulp
var gulp = require('gulp');
// Stock l'objet sass
var sass = require('gulp-sass');
// Permet d'ajouter des prefixes en css 
// ex : transform: scale(2) =-moz-transform: scale(2);-webkit-transform: scale(2);
var autoprefixer = require('gulp-autoprefixer');
// Generate CSS Sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// Add image minify in cache
var cache = require('gulp-cache');
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
  return gulp.src('dev/css/scss/*.scss')
  .pipe(autoprefixer())
  .pipe(sass(sassOption).on('error', sass.logError))
  .pipe(gulp.dest('dev/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

//Copy CSS sourcemaps from dev to web folder
gulp.task('cssmaps', function(){
  return gulp.src('dev/css/maps/**/*')
    .pipe(gulp.dest('web/css/maps'));
});

//Read HTML file to merge CSS and JS than minify them
gulp.task('useref', function(){

  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minifyCSS({shorthandCompacting:false}).on('error', gutil.log)))
    .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
    .pipe(gulpif('*.css',sourcemaps.write('css/maps')))
    .pipe(gulpif('*.js',sourcemaps.write('js/maps')))
    .pipe(gulp.dest('web'));
});

//Delete web folder
gulp.task('clean', function(callback){
  del('web');
  return cache.clearAll(callback);
});

// Permet de rafraichir la page des modification du sass
gulp.task('browserSync', function() {
  browserSync({
    proxy: 'http://127.0.0.1/epayspace/dev/index.html'
  })
});

// Permet d'observer chaque modification dans les ficher .scss
// en cas de changement la tache sass sera appeler
gulp.task('watch',function() {
  gulp.watch('dev/css/scss/*.scss',['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/js/*.js', browserSync.reload);
});

//Run sequence to build web folder
gulp.task('build', function(callback){
  runSequence('clean:web','sass', ['useref'], callback);
});

// Cette tache s'appel default permet d'etre lancé en tapant la commande gulp
// les tache entre crochet permet de lancer en même temps
gulp.task('default', function(callback){
  runSequence(['browserSync','watch'],callback);
});