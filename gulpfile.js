var gulp = require('gulp');
var elixir = require('laravel-elixir');
             require('laravel-elixir-pug');

elixir.config.assetsPath = 'source/_assets';
elixir.config.publicPath = 'source';

elixir.extend('sourcemaps', false);
elixir(function(mix) {

    mix.pug({
        blade: true,
        dest: './source/',
        search: '**/*.pug',
        src: './source/_assets/pug/',
    });

    mix.scripts([
        '../../../bower_components/jquery/dist/jquery.min.js',
        '../../../bower_components/tether/dist/js/tether.min.js',
        '../../../bower_components/bootstrap/dist/js/bootstrap.min.js',
        'main.js',
    ], 'source/js/main.js');

    mix.sass([
        '../../../bower_components/bootstrap/dist/css/bootstrap.min.css',
        'main.sass',
    ], 'source/css/main.css');

    mix.exec('jigsaw build', ['./source/**/*', '!./source/_assets/**/*'])
        .browserSync({
            server: { baseDir: 'build_local' },
            proxy: null,
            files: [ 'build_local/**/*' ]
        });
});
