/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.3.0
 */

'use strict'

const { readJson, writeJson } = require('fs-extra')
const { resolve } = require('path')
const scrape = require('./lib/scrape')

const fileName = resolve('data', 'links.json')

// Check the arguments.
const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('ERROR: No argument(s).')
  process.exit(0)
}

// Merge persistent links and scraped links and write the merged links back to the persistent storage.
(async () => {
  try {
    // Get persistent and scarped links.
    const persistentLinksPromise = readJson(fileName)
    const scrapedLinksPromise = scrape.extractLinks(args)
    const [persistentLinks, scrapedLinks] = await Promise.all([persistentLinksPromise, scrapedLinksPromise])

    // Add only unique links to the persistent links.
    const persistentLinksSet = new Set(persistentLinks.concat(scrapedLinks))

    // Write the links to JSON file.
    await writeJson(fileName, [...persistentLinksSet].sort(), { spaces: 4 })

    console.log('Done!')
  } catch (error) {
    console.error('ERROR:', error)
  }
})()

// // ALTERNATIVE SOLUTION - chaining promises

// // Get persistent and scarped links.
// const persistentLinksPromise = fs.readJson(fileName)
// const scrapedLinksPromise = scrape.extractLinks(args)

// Promise.all([persistentLinksPromise, scrapedLinksPromise])
//   .then(values => {
//     // Add only unique links to the persistent links.
//     const persistentLinks = values[0]
//     const scrapedLinks = values[1]

//     const persistentLinksSet = new Set(persistentLinks.concat(scrapedLinks))

//     // Write the links to JSON file.
//     return fs.writeJson(fileName, [...persistentLinksSet].sort(), {spaces: 4})
//   })
//   .then(value => {
//     console.log('Done!')
//   })
//   .catch(error => {
//     console.log('ERROR:', error)
//   })
