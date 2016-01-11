/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

"use strict";

const FILENAME = "./data/links.json";

let fsp = require("./libs/fs-promise");
let scrape = require("./libs/scrape");

// Arguments.
let args = process.argv.slice(2);

if (args.length === 0) {
    console.log("ERROR: No argument(s).");
    process.exit(0);
}

// Chaining promises.
Promise.all([fsp.readLinks(FILENAME), scrape.extractLinks(args)])
    .then(function(value) {
        // Union the sets and convert the resulting set to array and sort it.

        let links = new Set();

        value.forEach(function(set) {
            links = new Set([...links, ...set]);
        });

        return Promise.resolve([...links].sort());
    })
    .then(function(value) {
        fsp.writeLinks(FILENAME, value);
    })
    .then(function() {
        console.log("Done!");
    })
    .catch(function(error) {
        console.log("ERROR:", error);
    });
