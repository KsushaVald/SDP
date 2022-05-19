const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefexes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const util = require('gulp-util');
const sass = require('gulp-sass')(require('sass'));
const cheerio = require('gulp-cheerio');
const del = require('del');
const fileinclude = require('gulp-file-include');


const styles = () => {
  return src('src/css/**/*.css')
    .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.init())
    .pipe(concat('addStyle.css'))
    .pipe(autoprefexes({
      cascade: false,
    }))
    .pipe(util.env.type === 'build' ? cleanCSS({
      level: 2,
    }) : util.noop())
    .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.write())
    .pipe(util.env.type === 'build' ? dest('product/css') : dest('dist/css'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'src/html/',
    }))
    .pipe(util.env.type === 'build' ? htmlMin({
      collapseWhitespace: true,
    }): util.noop())
    .pipe(util.env.type === 'build' ? dest('product') : dest('dist'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
    .pipe(util.env.type ==='build' ? util.noop() : svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(util.env.type === 'build' ? dest('product/img') : dest('dist/img'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/*.svg',
    'src/img/**/*.jpeg'
  ])
  .pipe(image())
  .pipe(util.env.type === 'build' ? dest('product/img') : dest('dist/img'))
}

const favicon = () => {
  return src([
    'src/img/*.ico'
  ])
  .pipe(util.env.type === 'build' ? dest('product') : dest('dist'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/*.js'
  ])
  .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))

  .pipe(util.env.type === 'build' ? uglify({
    toplevel: true,
  }).on('error', notify.onError) : util.noop())
  .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.write())
  .pipe(util.env.type === 'build' ? dest('product/js') : dest('dist/js'))
  .pipe(browserSync.stream())
}

const resourses = () => {
  return src('src/resources/**')
  .pipe(util.env.type === 'build' ? dest('product/resources') : dest('dist/resources'));
}

const phpfiles = () => {
  return src('src/**.php')
  .pipe(util.env.type === 'build' ? dest('product/') : dest('dist/'));
}
const fonts = () => {
  return src('src/fonts/**')
  .pipe(util.env.type === 'build' ? dest('product/fonts') : dest('dist/fonts'));
}


const sassToCss = () => {
  return src('src/sass/style.scss')
  .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(util.env.type === 'build' ? util.noop() : sourcemaps.write())
  .pipe(util.env.type === 'build' ? dest('product/css') : dest('dist/css'))
  .pipe(browserSync.stream());
}

const clean = () => {
  if (util.env.type === 'build'){
    return del('product');
  }
  else{
    return del('dist');
  }
}

const watchFiels = () => {
  if(util.env.type === 'build'){
    browserSync.init({
      server: {
        baseDir: 'product',
      }
    })
  }
  else {
    browserSync.init({
      server: {
        baseDir: 'dist',
      }
    })
  }
}

watch('src/**/*.html', htmlMinify);
watch('src/**/*.css', styles);
watch('src/sass/**/*.scss', sassToCss);
watch('src/fonts/**', fonts);
watch('src/img/svg/**/*.svg', svgSprite);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resourses);
watch('src/**/*.php', phpfiles)


exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.clean = clean;


exports.default = series(clean, htmlMinify, styles, images, svgSprites, scripts, resourses, fonts, sassToCss, favicon, phpfiles, watchFiels);
