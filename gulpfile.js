// Fnk minus countdown Task config
// Author: Alberto Córcoles
//---------------------------------------------
// Pollyfill
// Requires
// Settings
// Server tasks
// Styles tasks
// Global task

// Pollyfill
//---------------------------------------------
// Important pollyfil to run gulp-uglify
var Promise = require('es6-promise').Promise;

// Requires
//---------------------------------------------
var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    gulpif 		= require('gulp-if'),
    gutil 		= require('gulp-util'),
    pump 		= require('pump'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    rename      = require('gulp-rename'),
    cssnano     = require('gulp-cssnano'),
    sourcemaps  = require('gulp-sourcemaps'),
    sassLint    = require('gulp-sass-lint'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    wrap        = require("gulp-wrap"),
    argv 		= require('yargs').argv,
    zip         = require('gulp-zip'),
    nodeMod     = require('find-node-modules'),
    svgo        = require('gulp-svgo'),
    svgSymbols = require('gulp-svg-symbols'),
    reload      = browserSync.reload;

// Settings
//---------------------------------------------
// Get the sass lint options from a json file

const settings = {
    root: './',
    dist: './dist/',
    assets: {
        img: './src/assets/img/',
        icons: './src/assets/svg-icons/'
    },
    sass: {
        name: 'styles',
        src: './src/scss/*/**.scss',
        lint: 'sass-lint.json',
        dest: 'css/'
    },
    js: {
        name: 'fnk.minus.countdown.js',
        src: [
            './src/js/main.js'
        ],
        dest: 'js/'
    },
    proxy: 'localhost:8080/fnk/fnk-minus-countdown/src/',
    port: '8082',
    package: './package.json'
}


var scssLintOptions = require('./sass-lint.json');
var pakageJSON = require('./package.json');


// Server tasks
//---------------------------------------------
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: settings.proxy,
        port: settings.port,
        plugins: [require('bs-console-qrcode')]
    });    

    gulp.watch("./src/scss/*/**/**.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", ['js:concat','js:compress']).on('change', browserSync.reload);
    gulp.watch("./src/js/*/**.js", ['js:concat','js:compress']).on('change', browserSync.reload);
    gulp.watch("./*/**.php, ./*/**.html").on('change', browserSync.reload);
});




// Styles tasks
//---------------------------------------------
// Compile sass into CSS & auto-inject into browsers

gulp.task('sass', ['sass-lint'], function() {    
    return gulp.src( settings.sass.src )
        .pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(rename('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulpif(argv.dev, sourcemaps.write()))
        .pipe(gulp.dest( settings.dist + settings.sass.dest ))
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(gulpif(argv.prod, rename({suffix:'.min'})))
        .pipe(gulp.dest( settings.dist + settings.sass.dest ));		
  });
  

// Check sass to find syntax errors or warnings.
// https://github.com/sasstools/sass-lint
gulp.task('sass-lint', function() {	
    return gulp.src([ settings.sass.src ])
      .pipe(gulpif(argv.dev, sassLint(scssLintOptions)))
      .pipe(gulpif(argv.dev, sassLint.format()))
      .pipe(gulpif(argv.dev, sassLint.failOnError()))
  });

// Script tasks
//---------------------------------------------
// Concat all js files
gulp.task('js:concat', function() {
    return gulp.src( settings.js.src )
      .pipe(concat( settings.js.name ))
      .pipe(gulp.dest( settings.dist + settings.js.dest ));
  });


gulp.task('js:compress', function () {
    gulp.src( settings.dist + settings.js.dest + settings.js.name )
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest( settings.dist + settings.js.dest ))
  })

// Package task and production
//---------------------------------------------
gulp.task('zip:dev', () =>
  gulp.src('./src/*')
      .pipe(zip(pakageJSON.name + '_' + pakageJSON.version + '.zip'))
      .pipe(gulp.dest('zips'))
);

gulp.task('zip:prod', () =>
  gulp.src('www/*')
      .pipe(zip(pakageJSON.name + '_' + pakageJSON.version + '.zip'))
      .pipe(gulp.dest('zips'))
);

gulp.task('zip:assets', () =>
  gulp.src('assets/*')
      .pipe(zip(pakageJSON.name + '_' + pakageJSON.version + '.zip'))
      .pipe(gulp.dest('zips'))
);

// Icons
//---------------------------------------------
//
gulp.task('sprites', ['svg-opt'], function () {
    return gulp.src( settings.assets.icons + 'optimizados/*.svg')
      .pipe(svgSymbols())
      .pipe(gulp.dest('./src/dist/assets/sprites/'));
});

gulp.task('svg-opt', () => { 
    return gulp.src(settings.assets.icons + '*')
        .pipe(svgo())
        .pipe(gulp.dest(settings.assets.icons + 'optimizados/'));
});

// Distribution site task
//---------------------------------------------
// Execute only to send project to server

gulp.task('dist', function(){
    return gulp.src([
        './**', 
        '!./{node_modules,node_modules/**}',
        '!./{www, www/**}',
        '!./{packages, packages/**}'
    ])
    .pipe(gulp.dest('./www/'))       
});

// Global tasks
//---------------------------------------------
gulp.task('start', ['sass','js:concat','js:compress','serve']);


