/**
 * Scrape module.
 * @module ./lib/scrape.js
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

// const cheerio = require('cheerio')
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

/**
 * Crawls the web page(s), extracts and returns the unique absolute links.
 *
 * @param {string[]} urls
 * @returns {Promise<Set>}
 */
const extractLinks = async urls => {
  let promises = []
  const urlSet = new Set()

  // Collect promises.
  urls.forEach(async url => promises.push(getText(url)))

  // Wait for the promises to resolve (or reject) to plain texts.
  const texts = await Promise.all(promises)

  // Parses the markup, with jsdom, and select all anchor elements to get the hrefs.
  texts.map(text => {
    const dom = new JSDOM(text)
    Array.from(dom.window.document.querySelectorAll(`a[href^='http://'], a[href^='https://']`))
      .map(element => urlSet.add(element.href))
  })

  // // ALTERNATIVE SOLUTION - cheerio
  // texts.map(text => cheerio.load(text)).forEach($ => {
  //   $('a[href^="http://"],a[href^="https://"]')
  //     .map(function (index, link) {
  //       urlSet.add($(link).attr('href'))
  //     })
  // })

  return urlSet
}

/**
 * Gets the plain text of an url.
 *
 * @param {string} url
 * @return {string}
 */
const getText = async url => {
  const response = await fetch(url)
  return response.text()
}

// Exports
module.exports.extractLinks = extractLinks
module.exports.getText = getText
