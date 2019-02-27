/**
 * Scrape module.
 * @module ./lib/scrape.js
 * @author Mats Loock
 * @version 1.2.0
 */

'use strict'

// const cheerio = require('cheerio')
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

/**
 * Crawls the web page(s), extracts and returns the unique absolute links.
 *
 * @param {string[]} urls
 * @returns {Promise<string[]>}
 */
const extractLinks = async urls => {
  // Collect promises.
  // urls.forEach(async url => promises.push(getText(url)))
  const textPromises = urls.map(url => getText(url))

  // Wait for the promises to resolve (or reject) to plain texts.
  const texts = await Promise.all(textPromises)

  // Parses the markup, with jsdom, and select all anchor elements to get the unique hrefs.
  const uniqueUrls = new Set()
  texts.map(text => {
    const dom = new JSDOM(text)
    Array.from(dom.window.document.querySelectorAll(`a[href^='http://'], a[href^='https://']`))
      .map(element => uniqueUrls.add(element.href))
  })

  // // ALTERNATIVE SOLUTION - cheerio
  // texts.map(text => cheerio.load(text)).forEach($ => {
  //   $('a[href^="http://"],a[href^="https://"]')
  //     .map(function (index, link) {
  //       uniqueUrls.add($(link).attr('href'))
  //     })
  // })

  return Array.from(uniqueUrls)
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
