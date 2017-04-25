var request = require('request');
var cheerio = require('cheerio');

request('http://www.visitseattle.org/things-to-do/neighborhoods/', function(error, response, data) {
    var $ = cheerio.load(data);

    var neighborhoods = $('.info-window-content').map(function(index, element) {
        return {
            name: $(element).find('h4').text(),
            link: $(element).find('a').attr('href')
        };
    }).get();

    console.log(neighborhoods);
});
