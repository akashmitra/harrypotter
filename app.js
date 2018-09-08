(function () {
    'use strict';

    /**
     * Module dependencies.
     * @author: Akash
     */

    var express = require('express'),
        http = require('http'),
        path = require('path'),
        log4js = require('log4js');

    var app = express();

    /* Injecting the Helper Classes */
    var logger = require('./log');
    //var db = require('./models/db');

    /*JS client side files has to be placed under a folder by name 'public' */
    app.use(express.static(path.join(__dirname, 'public')));
    /*to access the posted data from client using request body*/
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.favicon());

    //app.get('/', routes.index);
    //app.get('/users', user.list);

    /* Server at 80 */
    http.createServer(app).listen(3000, function () {
        logger.trace("Express server listening on port 3000 ");
    });

}());