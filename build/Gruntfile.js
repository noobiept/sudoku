var PATH = require( 'path' );

module.exports = function( grunt )
{
var dest = '../release/<%= pkg.name %> <%= pkg.version %>/';

grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

            // delete the destination folder
        clean: {
            options: {
                force: true
            },
            release: [
                dest
            ]
        },

            // copy the audio and libraries files
        copy: {
            release: {
                expand: true,
                cwd: '../',
                src: [
                    'libraries/**',
                    'maps/**'
                ],
                dest: dest
            }
        },

        uglify: {
            release: {
                files: {
                    '../release/<%= pkg.name %> <%= pkg.version %>/min.js': [
                            // the order matters, since some classes inherit from others, so the base ones need to be defined first
                            // this is based on the order in index.html
                        '../libraries/utilities.js',
                        '../scripts/solver.js',
                        '../scripts/entry.js',
                        '../scripts/menu.js',
                        '../scripts/high_score.js',
                        '../scripts/grid.js',
                        '../scripts/timer.js',
                        '../scripts/sudoku.js',
                        '../scripts/main.js'
                    ]
                }
            }
        },

        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '../css/',
                    src: 'style.css',
                    dest: PATH.join( dest, 'css' )
                }]
            }
        },

        processhtml: {
            release: {
                files: [{
                    expand: true,
                    cwd: '../',
                    src: 'index.html',
                    dest: dest
                }]
            }
        }
    });

    // load the plugins
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-processhtml' );

    // tasks
grunt.registerTask( 'default', [ 'clean', 'copy', 'uglify', 'cssmin', 'processhtml' ] );
};