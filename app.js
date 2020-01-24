/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const { resolve } = require('path')
const { readJson, writeJson } = require('fs-extra')
const { extractLinks } = require('./lib/scrape')

const path = resolve('data', 'links.json')

// Check the arguments.
const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('ERROR: No argument(s).')
  process.exit(0)
}

// Merge persistent links and scraped links and write the merged links back to the persistent storage.
;(async () => {
  try {
    // Get persistent and scarped links.
    // (Ignore any error reading the file with JSON and return an empty array.)
    // eslint-disable-next-line handle-callback-err
    const persistentLinksPromise = readJson(path).catch(error => [])
    const scrapedLinksPromise = extractLinks(args)
    const [persistentLinks, scrapedLinks] = await Promise.all([persistentLinksPromise, scrapedLinksPromise])

    // Add only unique links to the persistent links.
    const persistentLinksSet = new Set([...persistentLinks, ...scrapedLinks])

    // Write the links to JSON file.
    await writeJson(path, [...persistentLinksSet].sort(), { spaces: 4 })

    console.log('Done!')
  } catch (error) {
    console.error('ERROR:', error)
  }
})()

// // ALTERNATIVE SOLUTION - chaining promises

// // Get persistent and scarped links.
// // eslint-disable-next-line handle-callback-err
// const persistentLinksPromise = readJson(path).catch(error => [])
// const scrapedLinksPromise = extractLinks(args)

// Promise.all([persistentLinksPromise, scrapedLinksPromise])
//   .then(([persistentLinks, scrapedLinks]) => {
//     // Add only unique links to the persistent links.
//     const persistentLinksSet = new Set([...persistentLinks, ...scrapedLinks])

//     // Write the links to JSON file.
//     return writeJson(path, [...persistentLinksSet].sort(), { spaces: 4 })
//   })
//   .then(value => {
//     console.log('Done!')
//   })
//   .catch(error => {
//     console.error('ERROR:', error)
//   })
