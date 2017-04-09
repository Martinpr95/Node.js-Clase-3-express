//que escuche todo lo que pasa en modules/**
//y app.js

var gulp = require("gulp");
//var server = require("gulp-server-livereload");
var spawn = require("child_process").spawn;
var node;

gulp.task("serve", function(){
    if(node){
        node.kill();
    }
    node = spawn("node",["app.js"], { stdio:"inherit" });
    node.on("close",function(code){
        console.log(code);
        if(code == 8){
            console.log("Esperando.");
        }

    });
});

gulp.task("default", ["serve","server"], function(){
    gulp.watch(["app.js","./modules/**/*.js"],function(evento){
        console.log("Cambió! Invoco a server");
        gulp.run("serve");
    });
});

/*gulp.task("server", function(){ // src es como el watch
    gulp.src('./www') 
    .pipe(server({
        port: 8124,
        default: 'index.html', //Escucha por ejemplo el cambio del index, si tocas el index.html, te lo refresca.
        livereload: true,
        open: true
    }));
});
*/
