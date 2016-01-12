/**
 * Module.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

"use strict";

let cheerio = require("cheerio");
let rp = require("request-promise");

/**
 * Crawls the web page(s), extracts and returns the unique absolute links.
 * @param urls {Array.<string>}
 * @returns {Promise.<Set>}
 */
let extractLinks = function(urls) {
    let promises = [];
    let options = {
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    // Collect request promises.
    urls.forEach(function(url) {
        options.uri = url;
        promises.push(rp(options));
    });

    // Wait for the promises to resolve (or reject).
    return Promise.all(promises).then(function(value) {
        var urlSet = new Set();

        value.forEach(function($) {
            $("a")
                .filter("[href^='http://'],[href^='https://']")
                .map(function(index, link) {
                    urlSet.add($(link).attr("href"));
                });
        });

        return Promise.resolve(urlSet);
    });
};

// Exports
module.exports.extractLinks = extractLinks;
