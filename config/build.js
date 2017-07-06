/**
 * Created by disme on 06/07/17.
 */

var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('/');

builder.config(
    {
        baseURL: "./",
        defaultJSExtensions: true,
        map: {
            'd3-selection': './node_modules/d3-selection/build/d3-selection.js',
            'd3-color': './node_modules/d3-color/build/d3-color.js'

        },
        packages: {
            './': {
                defaultExtensions: 'js'
            }
        }
    }
);

builder
    .buildStatic('index.js', 'build.js')
    .then(function () {
        console.log('Build complete');
    })
    .catch(function (err) {
        console.log('Build error');
        console.log(err);
    });