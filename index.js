var request = require('request');
var cheerio = require('cheerio');

request('http://www.visitseattle.org/things-to-do/neighborhoods/', function (error, response, body) {
    var $ = cheerio.load(body);
    var neighborhoodsScrape = $('.info-window-content')

    var neighborhoods = neighborhoodsScrape.map((idx, hood) => {
        // grab the text/attributes from cheerio the cheerio objects
        var name = $(hood).find('h4').text();
        var link = $(hood).find('a').attr('href');
        var photo = $(hood).find('.info-window-content-image').attr('style');
        var description = $(hood).find('p').text();

        // photo is: background-image: url('http://example.com')
        // split on the ' character, and grab the middle url portion
        photo = photo ? photo.split(/'/)[1] : ""

        return {
            name,
            link,
            photo,
            description
        }

    }).get();

    console.log(neighborhoods);
});
