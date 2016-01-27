/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

"use strict";

const FILENAME = "./data/links.json";

let fsp = require("./lib/fs-promise");
let scrape = require("./lib/scrape");

// Arguments.
let args = process.argv.slice(2);

if (args.length === 0) {
    console.log("ERROR: No argument(s).");
    process.exit(0);
}

// Chaining promises.
Promise.all([fsp.readLinks(FILENAME), scrape.extractLinks(args)])
    .then(function(linkSets) {
        // Union the sets and convert the resulting set to array and sort it.

        let links = new Set();

        linkSets.forEach(function(set) {
            links = new Set([...links, ...set]);
        });

        return Promise.resolve([...links].sort());
    })
    .then(function(linkArray) {
        fsp.writeLinks(FILENAME, linkArray);
    })
    .then(function() {
        console.log("Done!");
    })
    .catch(function(error) {
        console.log("ERROR:", error);
    });
