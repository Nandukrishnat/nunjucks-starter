const gulp = require("gulp");
const del = import("del");
const njk = require("gulp-nunjucks-render");
const beautify = require("gulp-beautify");

async function clean() {
  return del.then((val) => val.deleteSync(["dist"]));
}

function html() {
  return gulp
    .src("src/html/pages/*.+(html|njk)")
    .pipe(
      njk({
        path: ["src/html"],
      })
    )
    .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
    .pipe(gulp.dest("dist"));
}

function watchFiles() {
  gulp.watch("src/html/**/*", html);
}

exports.build = gulp.series(clean,html);
exports.default = gulp.series(clean, html, watchFiles);
