/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const fs = require('fs-extra')
const scrape = require('./lib/scrape')

const FILE = './data/links.json'

// Check the arguments.
let args = process.argv.slice(2)

if (args.length === 0) {
  console.log('ERROR: No argument(s).')
  process.exit(0)
}

// Merge persistent links and scraped links and write the merged links back to the persistent storage.
;(async () => {
  try {
    // Get persistent and scarped links.
    const persistenLinksPromise = fs.readJson(FILE)
    const scrapedLinksPromise = scrape.extractLinks(args)
    const [persistentLinks, scrapedLinksSet] = await Promise.all([persistenLinksPromise, scrapedLinksPromise])

    // Add only unique links to the persistent links.
    const persistentLinksSet = new Set(persistentLinks)
    scrapedLinksSet.forEach(link => persistentLinksSet.add(link))

    // Write the links to JSON file.
    await fs.writeJson(FILE, [...persistentLinksSet].sort(), {spaces: 4})

    console.log('Done!')
  } catch (error) {
    console.error('ERROR:', error)
  }
})()

// // ALTERNATIVE SOLUTION - chaining promises

// // Get persistent and scarped links.
// const persistenLinksPromise = fs.readJson(FILE)
// const scrapedLinksPromise = scrape.extractLinks(args)

// Promise.all([persistenLinksPromise, scrapedLinksPromise])
//   .then(values => {
//     // Add only unique links to the persistent links.
//     const persistentLinks = values[0]
//     const scrapedLinksSet = values[1]

//     const persistentLinksSet = new Set(persistentLinks)
//     scrapedLinksSet.forEach(link => persistentLinksSet.add(link))

//     // Write the links to JSON file.
//     return fs.writeJson(FILE, [...persistentLinksSet].sort(), {spaces: 4})
//   })
//   .then(value => {
//     console.log('Done!')
//   })
//   .catch(error => {
//     console.log('ERROR:', error)
//   })
