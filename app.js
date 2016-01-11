/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

"use strict";

const FILENAME = "./data/links.json";

let cheerio = require("cheerio");
let fs = require("fs");
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

/**
 * Read links from file.
 * @param filename
 * @returns {Promise}
 */
let readLinks = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, "utf8", function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(new Set(JSON.parse(data)));
            }
        });
    });
};

/**
 * Write links to file.
 * @param filename
 * @param data {Array.<string>}
 * @returns {Promise}
 */
let writeLinks = function(filename, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename, JSON.stringify(data, null, 4), "utf8", function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Arguments.
let args = process.argv.slice(2);

if (args.length === 0) {
    console.log("ERROR: No argument(s).");
    process.exit(0);
}

// Chaining promises.
Promise.all([readLinks(FILENAME), extractLinks(args)])
    .then(function(value) {
        // Union the sets and convert the resulting set to array and sort it.

        let links = new Set();

        value.forEach(function(set) {
            links = new Set([...links, ...set]);
        });

        return Promise.resolve([...links].sort());
    })
    .then(function(value) {
        writeLinks(FILENAME, value);
    });
