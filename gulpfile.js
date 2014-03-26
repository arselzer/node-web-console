var fs = require("fs"),
    gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer");

var jsFiles = ["public/js/*.js"];
var lessFiles = ["public/less/*.less"];

gulp.task("compile-less", function() {
  gulp.src(lessFiles)
  .pipe(less())
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest("public/css"));
});

gulp.task("lint-js", function() {
  gulp.src(jsFiles)
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("watch", function() {
  gulp.watch(lessFiles, ["compile-less"]);
  gulp.watch(jsFiles, ["lint"]);
});

gulp.task("default", ["lint-js", "compile-less"]);