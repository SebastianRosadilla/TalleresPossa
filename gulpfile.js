var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ pattern: '*' });

/**
 * Definitions for source and destination paths.
 */
var FILES = {
  SRC: {
    JS: ['src/**/js/**/*.js', 'src/**/js/*.js', 'src/extra/*.*',
         'bower_components/bootstrap/dist/js/bootstrap.min.js'],
    SCSS: ['src/**/scss/*.*', 'src/**/scss/**/*.*', 
           'bower_components/bootstrap/dist/css/bootstrap.min.css',
           'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'],
    HTML: ['src/**/templates/*.*', 'src/index.html'],
    BOWER: ['bower_components/**/*.*', 'src/extra/*.*'],
    FONT: ['src/app/fonts/**/*.*', 'src/app/fonts/*.*', 
           'bower_components/bootstrap/dist/fonts/*.*'],
    IMG: ['src/img/**/*.*']
  },
  DEST: {
    JS: 'build/js/',
    CSS: 'build/css/',
    HTML: 'build/',
    BOWER: 'build/js/libs/',
    FONT: 'build/fonts/',
    IMG: 'build/img/'
  }
};

/**
 * Initialize the server.
 */
gulp.task('watch', ['js', 'scss', 'html'], function () {
  plugins.browserSync({
    server: { baseDir: 'build' },
    files: [
      FILES.DEST.JS,
      FILES.DEST.CSS,
      FILES.DEST.HTML
    ]
  });

  gulp.watch(FILES.SRC.JS, ['build']);
  gulp.watch(FILES.SRC.SCSS, ['build']);
  gulp.watch(FILES.SRC.HTML, ['build']);
  gulp.watch(FILES.SRC.BOWER, ['build']);
});

/**
* Compile prints
*/
gulp.task('html', function () {
  gulp
    .src(FILES.SRC.HTML)
    .pipe(gulp.dest(FILES.DEST.HTML));
});

/**
* Compile prints
 */
gulp.task('img', function () {
  gulp
    .src(FILES.SRC.IMG)
    .pipe(gulp.dest(FILES.DEST.IMG));
});

/**
 * Compile ECMAScript 6 files.
 */
gulp.task('js', function () {
  gulp
    .src(FILES.SRC.JS)
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(FILES.DEST.JS));
});

/**
 * Compile SCSS files.
 */
gulp.task('scss', function () {
  gulp
    .src(FILES.SRC.SCSS)
    .pipe(plugins.sass())
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(FILES.DEST.CSS));
});

/**
* Compile Fonts files.
*/
gulp.task('fonts', function () {
  gulp
    .src(FILES.SRC.FONT)
    .pipe(gulp.dest(FILES.DEST.FONT));
});


gulp.task('bower', function () {
  gulp
    .src(FILES.SRC.BOWER)
    .pipe(gulp.dest(FILES.DEST.BOWER));
})

// Build command
gulp.task('build', ['scss', 'html', 'js', 'bower','img', 'fonts']);
