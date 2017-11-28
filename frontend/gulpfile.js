var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  del = require('del');
var minifyCSS = require('gulp-minify-css');
var ngHtml2Js = require("gulp-ng-html2js");
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var moment = require('moment');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');

var packageInfo = require('./package.json');
var assets = require('./assets.js');
const babili = require("gulp-babili");
var minifyHtml = require("gulp-minify-html");
var angularTemplateCache = require('gulp-angular-templatecache');

/**
* Compila los HTML a templates de angular *
*/
gulp.task('html', function() {
  return gulp.src(assets.html)
    .pipe(ngHtml2Js({
      moduleName: "Gdo"
    }))
    .pipe(replace('@@VERSION@@', packageInfo.version))
    .pipe(replace('@@BUILDTIME@@', moment().format('DD.MM.YYYY HH:mm')))
    .pipe(concat("partials.js"))
    .pipe(gulp.dest('./dev/partials'));
});

/**
* Minifica el JS.
*/
gulp.task('minify-html', function() {
  return gulp.src(assets.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      caseSensitive: true,
      preserveLineBreaks: false,
      removeEmptyAttributes: false,
      ignoreCustomFragments: [ /\{\{[\s\S]*?\}\}/ ]
    }))
    .pipe(ngHtml2Js({
      moduleName: "Gdo"
    }))
    .pipe(replace('@@VERSION@@', packageInfo.version))
    .pipe(replace('@@BUILDTIME@@', moment().format('DD.MM.YYYY HH:mm')))
    .pipe(concat("partials.js"))
    .pipe(uglify())
    .pipe(gulp.dest('./dev/partials'));
});
/**
* Minifica el JS.
*/
gulp.task('minify-js', function() {
  return gulp.src('dev/js/main.js')
    .pipe(babili({mangle: false}))
    .pipe(gulp.dest('./dev/js'))
});

/**
* Minifica el css
*/
gulp.task('minify-css', function() {
  return gulp.src('dev/css/main.css')
    .pipe(rename('main-' + Math.floor(Date.now() / 1000) + '.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('merge-partials', function() {
  return gulp.src(['./dev/js/main.js', './dev/partials/partials.js'])
    .pipe(concat('main.js'))
    .pipe(rename('main-' + Math.floor(Date.now() / 1000) + '.min.js'))
    .pipe(gulp.dest('build/js'))
})

/**
* Tarea para minificar todos los recursos
* Limpia los directorios, crea los compilados, los minifica y los inyecta en el html
* los array de acciones corren en paralelo
*/
gulp.task('build', function(cb) {
  runSequence('clean', ['js', 'styles'], ['minify-html', 'minify-css', 'minify-js'], 'merge-partials', 'inject-minify', cb);
});

/**
* Inyecta los recursos en el index con nombre dinamico
* tarea a modo de parche cuando viene del minify
*/
gulp.task('inject-minify', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./build/js/main-*.js', './build/css/main-*.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('.'));
});

/**
* Inyecta los recursos en el index con nombre dinamico
*/
gulp.task('inject', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./dev/js/*.js', './dev/partials/*.js', './dev/css/*.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('.'));
});

/**
* Arma el compilado con los js
*/
gulp.task('js', function() {
  return gulp.src(assets.js)
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dev/js'))
});

/**
* Arma el compilado con los css y sass
*/
gulp.task('styles', function() {
  return merge(
    gulp.src(assets.scss).pipe(sass().on('error', sass.logError)),
    gulp.src(assets.css)
  ).pipe(concat('main.css')).pipe(gulp.dest('dev/css'));
});

/**
* Copia las fuentes de FA y bootstrap a la carpeta dev. Hay que correrla a mano gulp fonts
*/
gulp.task('fonts', function() {
  return gulp.src(assets.fonts)
    .pipe(gulp.dest('dev/fonts'))
    .pipe(gulp.dest('build/fonts'));
});

/**
* Listener para cambios con sus respectivas funciones
*/
gulp.task('watch', function() {
  gulp.watch('app/*.js', ['js']);
  gulp.watch('app/**/*.js', ['js']);
  gulp.watch('app/**/**/*.js', ['js']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('css/*.css', ['styles']);
  gulp.watch('css/**/*.css', ['styles']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('app/components/**/*.html', ['html']);
  gulp.watch('app/components/**/**/*.html', ['html']);
  gulp.watch('app/common/**/*.html', ['html']);
});

gulp.task('clean', function(cb) {
  del(['build/js', 'build/css', 'dev/js', 'dev/css', 'dev/partials'], cb())
});

gulp.task('default', ['clean'], function() {
  runSequence(['styles', 'js', 'html'], 'inject', 'watch');
});