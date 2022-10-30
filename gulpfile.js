let project_folder = 'dist',
    source_folder = 'src',
    path = {
        build: {
            html: project_folder + '/',
            css: project_folder + '/css/',
            js: project_folder + '/js/',
            img: project_folder + '/img/',
            fonts: project_folder + '/fonts/',
            cdn: project_folder + '/cdn/',
        },
        src: {
            html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
            css: source_folder + '/sass/*.sass',
            js: source_folder + '/js/*.js',
            img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp,mp4,webm}',
            fonts: source_folder + '/fonts/**/*',
            cdn: source_folder + '/cdn/**/*',
        },
        watch: {
            html: source_folder + '/**/*.html',
            css: source_folder + '/sass/**/*.sass',
            js: source_folder + '/js/**/*.js',
            img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        },
        clean: "./" + project_folder + '/'
    };

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersynk = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),//проставить префиксы для поддержки браузеров
    group_media = require('gulp-group-css-media-queries'),//сгрупировать медиа запросы и поставить их в конец
    clean_css = require('gulp-clean-css'),//убрать лишний css
    rename = require('gulp-rename'),//сделать для файла CSS минифицированый и обычный
    uglify = require('gulp-uglify-es').default;//Минифицировать js

function browserSynk(params) {
    browsersynk.init({
        server: {
            baseDir: "./" + project_folder + '/'
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersynk.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersynk.stream())
}
function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersynk.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        // .pipe(dest(path.build.css))
        .pipe(clean_css())
        // .pipe(
        //     rename({
        //             extname: ".min.css"
        //         }
        //     )
        // )
        .pipe(dest(path.build.css))
        .pipe(browsersynk.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                    extname: ".min.js"
                }
            )
        )
        .pipe(dest(path.build.js))
        .pipe(browsersynk.stream())
}

function cdns() {
    return src(path.src.cdn)
        .pipe(dest(path.build.cdn))
        .pipe(browsersynk.stream())
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

let build = gulp.series(clean, gulp.parallel(css, js, html, images, fonts, cdns));
let watch = gulp.parallel(build, watchFiles, browserSynk);


exports.images = images;
exports.cdns = cdns;
exports.fonts = fonts;
exports.css = css;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;



