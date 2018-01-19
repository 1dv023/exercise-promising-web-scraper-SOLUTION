# Promising Web Scraper

In this exercise you are going to create a web scraper, i.e. a program that to some extends acts as a web browser.

The program will request pages from web servers, extract the links and write the web sources to a file in JSON format. The pages to request is to be passed as command line arguments. It’s only absolute web sources that are interesting, relative web sources can be ignored. The file must not contain any duplicated values and the values must be sorted in ascending order.

To avoid “callback hell” you are obliged to use promises instead of callback functions. You may need to “promisify” one or another API function to avoid callbacks.

JavaScript has a number of new features that can be useful; especially [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is handy to collect unique values. For the JSON data to be easy to read make sure it’s “prettified” before writing it to the file.

## Example use and output

Example of command line to run the application.

```shell
$ node app.js https://nodejs.org/en/ https://developer.mozilla.org/en-US/
```

The content of the file after the command. Web sources retrieved from [https://nodejs.org/en/](https://nodejs.org/en/) and [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/). [19 January 2018]

```shell
[
    "http://collabprojects.linuxfoundation.org/",
    "http://hacks.mozilla.org/",
    "http://www.linuxfoundation.org/programs/legal/trademark",
    "https://bugzilla.mozilla.org/form.doc?bug_file_loc=https%3A//developer.mozilla.org/en-US/",
    "https://bugzilla.mozilla.org/form.mdn",
    "https://developers.google.com/v8/",
    "https://donate.mozilla.org/?utm_source=developer.mozilla.org&utm_medium=referral&utm_content=footer",
    "https://foundation.nodejs.org/",
    "https://github.com/mdn/",
    "https://github.com/mozilla/kuma#readme",
    "https://github.com/nodejs/Release#release-schedule",
    "https://github.com/nodejs/help/issues",
    "https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V8.md#8.9.4",
    "https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V9.md#9.4.0",
    "https://github.com/nodejs/node/issues",
    "https://github.com/nodejs/nodejs.org/issues",
    "https://hacks.mozilla.org/2017/09/rnnoise-deep-learning-noise-suppression/",
    "https://hacks.mozilla.org/2017/10/containers-for-add-on-developers/",
    "https://hacks.mozilla.org/2017/10/firefox-56-last-stop-before-quantum/",
    "https://hacks.mozilla.org/2017/10/multi-user-experiences-with-a-frame/",
    "https://hacks.mozilla.org/2017/10/the-whole-web-at-maximum-fps-how-webrender-gets-rid-of-jank/",
    "https://mozilla.org/",
    "https://newsletter.nodejs.org/",
    "https://nodejs.org/dist/latest-v8.x/docs/api/",
    "https://nodejs.org/dist/latest-v9.x/docs/api/",
    "https://nodejs.org/dist/v8.9.4/",
    "https://nodejs.org/dist/v9.4.0/",
    "https://nodejs.org/en/blog/vulnerability/jan-2018-spectre-meltdown/",
    "https://nodejs.org/en/download/",
    "https://nodejs.org/en/download/current/",
    "https://qsurvey.mozilla.com/s3/MDN-dev-survey-2018-1",
    "https://raw.githubusercontent.com/nodejs/node/master/LICENSE",
    "https://stackoverflow.com/",
    "https://support.mozilla.org/",
    "https://twitter.com/mozdevnet",
    "https://twitter.com/mozilla",
    "https://www.facebook.com/mozilla",
    "https://www.instagram.com/mozillagram/",
    "https://www.mozilla.org/about/",
    "https://www.mozilla.org/about/legal/terms/mozilla",
    "https://www.mozilla.org/contact/",
    "https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral",
    "https://www.mozilla.org/privacy/",
    "https://www.mozilla.org/privacy/websites/",
    "https://www.mozilla.org/privacy/websites/#cookies",
    "https://www.npmjs.com/",
    "https://www.saucelabs.com/cross-browser-testing-tutorial?utm_campaign=cbt&utm_medium=banner&utm_source=home-page"
]
```

## Hints

- [4 ways for making HTTP(S) requests with Node.js](https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d)
- [Parsing HTML: A Guide to Select the Right Library](https://tomassetti.me/parsing-html/#nodejs)
- [Getting starting with web scraping in node.js](https://scotch.io/tutorials/scraping-the-web-with-node-js)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
