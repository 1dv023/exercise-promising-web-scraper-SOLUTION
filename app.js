/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.2.0
 */

'use strict'

const fs = require('fs-extra')
const scrape = require('./lib/scrape')

const FILE = './data/links.json'

// Check the arguments.
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('ERROR: No argument(s).')
  process.exit(0)
}

// Merge persistent links and scraped links and write the merged links back to the persistent storage.
(async () => {
  try {
    // Get persistent and scarped links.
    const persistentLinksPromise = fs.readJson(FILE)
    const scrapedLinksPromise = scrape.extractLinks(args)
    const [persistentLinks, scrapedLinks] = await Promise.all([persistentLinksPromise, scrapedLinksPromise])

    // Add only unique links to the persistent links.
    const persistentLinksSet = new Set(persistentLinks.concat(scrapedLinks))

    // Write the links to JSON file.
    await fs.writeJson(FILE, [...persistentLinksSet].sort(), {spaces: 4})

    console.log('Done!')
  } catch (error) {
    console.error('ERROR:', error)
  }
})()

// // ALTERNATIVE SOLUTION - chaining promises

// // Get persistent and scarped links.
// const persistentLinksPromise = fs.readJson(FILE)
// const scrapedLinksPromise = scrape.extractLinks(args)

// Promise.all([persistentLinksPromise, scrapedLinksPromise])
//   .then(values => {
//     // Add only unique links to the persistent links.
//     const persistentLinks = values[0]
//     const scrapedLinks = values[1]

//     const persistentLinksSet = new Set(persistentLinks.concat(scrapedLinks))

//     // Write the links to JSON file.
//     return fs.writeJson(FILE, [...persistentLinksSet].sort(), {spaces: 4})
//   })
//   .then(value => {
//     console.log('Done!')
//   })
//   .catch(error => {
//     console.log('ERROR:', error)
//   })
