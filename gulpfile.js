const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const minify = require('gulp-minify')
const del = require('del')
const sync = require('browser-sync').create()
var devip = require('dev-ip');

function html(){
	return src('src/**.html')
			.pipe(include({
				prefix: '@@'
			}))
			.pipe(dest('dist'))
}

function scss(){
	return src('src/scss/**.scss')
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(csso())
			.pipe(concat('style.min.css'))
			.pipe(dest('dist/css/'))
}
function scss2(){
	return src('src/scss/**.scss')
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(concat('style.css'))
			.pipe(dest('dist/css/'))
}

function js(){
	return src('src/js/**.js')
		.pipe(dest('dist/js/'))
}
function minjs(){
	return src('src/js/**.js')
		.pipe(minify())
		.pipe(dest('dist/js/'))
}

function img(){
	return src('src/img/**.{jpg,png,jpeg,svg}')
		.pipe(dest('dist/assets/'))
}

function clear(){
	return del('dist')
}

function serve(){
	sync.init({
		server: './dist',
		tunnel: true,
	})
	console.log(devip())
	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/scss/**.scss', series(scss, scss2)).on('change', sync.reload)
	watch('src/js/**.js', series(js)).on('change', sync.reload)
	watch('src/img/*', series(img)).on('add', sync.reload)
	watch('src/img/*', series(img)).on('change', sync.reload)
}

exports.serve = series(clear, scss, html, js, img ,scss2, minjs, serve)
exports.build = series(clear, scss, html, js ,img, scss2, minjs) 
exports.clear=  clear