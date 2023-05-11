module.exports = function (grunt) {

    grunt.initConfig({


        /**
            Configuration
        **/
        pkg: grunt.file.readJSON('package.json'),

        /** 
         * 
         * Start Local Server
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            server: {
                options: {
                    port: 8000, // the port on which the webserver will respond
                    base: '.', // the root of your project
                    keepalive: false, // keeps the Grunt process running indefinitely, which would prevent the watch task from running if you're starting them with the same command
                    livereload: true, // reload on changes
                    open: true // open default browser while launching
                }
            }
        },

        /**
            Paths
            Use ex: '<%= path.src.js %>/main.js' -> 'src/js/main.js'
        **/
        path: {
            // Source
            src: {
                css: 'css',
                img: 'images',
                js: 'js',
                fonts: 'fonts',
                html: 'html',
                components: 'components'
            },

            // Distribution
            dist: {
                css: 'dist/assets/css',
                img: 'dist/assets/images',
                js: 'dist/assets/js',
                fonts: 'dist/assets/fonts',
                html: 'dist',
                components: 'dist/components'
            }
        },

        /**
            Finish off our CSS with PostCSS (& plugins)
            https://github.com/nDmitry/grunt-postcss
        **/
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('tailwindcss')()
                ]
            },
            dist: {
                expand: true,
                cwd: 'css',
                src: ['**/*.css'],
                dest: 'dist/assets/css',
                ext: '.css'
            }
        },

        /**
            Concatenate HTML files
            https://github.com/vanetix/grunt-includes
        **/
        includes: {
            default: {
                options: {
                    // Exclude html/parts directory
                    exclude: '<%= path.src.html %>/parts/**',
                },
                files: [{
                    cwd: '<%= path.src.html %>/',
                    src: '**/*.html',
                    dest: '<%= path.dist.html %>',
                    flatten: true
                }]
            }
        },

        /**
            Copy files
            https://github.com/gruntjs/grunt-contrib-copy
        **/
        copy: {
            assets: {
                expand: true,
                src: [
                    '<%= path.src.fonts %>/**/*', 
                    '<%= path.src.img %>/**/*', 
                    '<%= path.src.js %>/**/*',
                ],
                dest: 'dist/assets/',
            },
            components: {
                expand: true,
                src: ['<%= path.src.components %>/**/*'],
                dest: 'dist/',
            }
        },


        /**
            Concatenate JS files
            https://github.com/gruntjs/grunt-contrib-concat
        **/
        concat: {
            default: {
                src: '<%= path.src.js %>/main.js',
                dest: '<%= path.dist.js %>/main.js'
            }
        },
        

        /**
            Remove production files from production
            https://github.com/cgross/grunt-dom-munger
        **/
        dom_munger: {
            default: {
                options: {
                    remove: ['script[data-remove="true"]', 'link[data-remove="true"]']
                },
                src: '<%= path.dist.html %>/**/*.html'
            }
        },

        /**
            Watch our files for changes and live-reload
            https://github.com/gruntjs/grunt-contrib-watch
        **/
        watch: {
            options: {
                livereload: true,
            },

            gruntfile: {
                files: 'Gruntfile.js',
                options: {
                    reload: true
                }
            },

            css: {
                files: ['<%= path.src.css %>/**/*.css', 'tailwind.config.js'],
                tasks: ['postcss'],
                options: {
                    interrupt: true,
                    livereload: true
                },
            },

            html: {
                files: '<%= path.src.html %>/**/*.html',
                tasks: ['includes', 'postcss'],
            },

            js: {
                files: '<%= path.src.js %>/**/*.js',
                tasks: ['concat'],
            },

            components: {
                files: '<%= path.src.components %>/**/*.*',
                tasks: ['copy:components'],
            }
        }

    });


    /**
     * Load Grunt tasks automatically
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Register tasks
     */

    // Build our CSS and JS files
    grunt.registerTask('build', ['includes', 'dom_munger', 'postcss', 'copy', 'concat']);

    // Watch our files and compile if any changes
    grunt.registerTask('default', ['build', 'connect', 'watch']);

}
