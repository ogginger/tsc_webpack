//webpack.config.js: Webpack configuration file for the supernovabookmarks application.

var path = require("path");
var webpack = require("webpack");
var _ = require('lodash');

function template(env) {
    return {
        entry: undefined,
        mode: "development",  
        output: undefined,
        optimization: {
            "minimize": false
        },
        module: {
            rules: [{
                test: /\.html$/,
                exclude: /node_modules/,
                use: ['html-es6-template-loader']
            },
            { 
                test: /\.tsx?$/,
                loader: 'ts-loader' 
            }]
        },
        resolve: {
            modules: ['node_modules','../lib'],
            extensions: ['.js','.ts', '.html', ".css"]
        },
        plugins: []
    };
}

function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
}
var merge = function(dst, src) {
    return _.mergeWith(dst,src,customizer);
}

function createWebpackExport(env, config) {
    if ( config.entry == undefined ) {
        throw new Error("Webpack config entry point was not defined!");
    } else if ( config.output == undefined ) {
        throw new Error("Webpack config output was not defined!");
    } else {
        var ex = template(env);
        ex.entry = path.resolve(__dirname, config.entry),
        ex.output = {
            path: path.resolve(__dirname, 'dist'),
            filename: config.output
        };

        if ( config.options ) {
            ex = merge(ex, config.options)
        }

        return ex;
    }
}

function _export( env, configs ) {
    var outConfigs=[];
    for(var config of configs) {
        outConfigs.push(createWebpackExport(env,config))
    }
    return outConfigs;
}

module.exports = _export( "builds", [{
        entry: "src/main.ts",
        output: "main.js",
        options: {}
    }
]);