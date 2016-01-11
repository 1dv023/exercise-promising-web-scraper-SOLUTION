/**
 * Module.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

"use strict";

let fs = require("fs");

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

// Exports
module.exports.readLinks = readLinks;
module.exports.writeLinks = writeLinks;
