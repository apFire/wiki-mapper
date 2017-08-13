'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var Crawler = require("node-webcrawler");
var url = require('url');
var fs = require('fs');


const restService = express();
restService.use(bodyParser.json());

restService.get('/map', function (req, res) {

    console.log('hook request');
    var result = '';

    try {
        var depth = 3;
        var c = new Crawler({
            maxConnections : 10,
            // This will be called for each crawled page 
            callback : function (error, result, $) {
                // $ is Cheerio by default 
                //a lean implementation of core jQuery designed specifically for the server 
                if(error){
                    console.log(error);
                }else{
                    console.log($("title").text());
                    var links = $('a'); //jquery get all hyperlinks
                    $(links).each(function(i, link){
                        var item = $(link).text() + '  :  ' + $(link).attr('href');
                        console.log($(link).text());
                        fs.appendFile('helloworld.txt', item, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    });
                }
            }
        });

        c.queue('https://en.wikipedia.org/wiki/Software_engineering');

        return res.json({
            result: 'Completed \n' + result
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
