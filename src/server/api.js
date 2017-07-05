const firebase = require('firebase');
const url = require('url');

/**
 * An API to access HackerNews information. Inspired by 
 * https://github.com/cheeaun/node-hnapi
 */
firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
});
var hn = firebase.database().ref('/v0');

/**
 * A function which shapes the output of HN's response
 * for a single item
 */
function shapeOutput(item) {

    let output = {
        id: item.id,
        title: item.title,
        points: item.score,
        user: item.by,
        time: item.time,
        comments_count: item.descendants || 0,
    };

    // set the url
    if (item.url) {
        output.url = item.url;
        output.domain = url.parse(item.url).hostname.replace(/^www\./i, ''); // remove www from the url
    } else {
        output.url = `item/${item.id}`; // a local link
    }

    // identify ask stories
    if (item.type == 'story' && output.url.match(/^item/i) && item.title.match(/^ask/i)){
        output.type = 'ask';
    }

    return output;
}

/**
 * Retrieve a page of stories from the given base url
 * 
 * @param {string} base - the base url we use to retrieve firebase data from 
 * @param {object} options - an options object. Accepts page # and number of items. Defaults to 1 and 30 respectively
 * @param {function} fn - a callback function to be called on completion. Parameter 1 refers to errors while parameter 2 refers to responses
 */
async function stories(base, options) {
    const opts = Object.assign({ page: 1, limit: 30 }, options);
    const limit = opts.limit;
    const page = opts.page;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const stories = hn.child(base).limitToFirst(limit * page);

    try {
        // get the subsection of itemIDs we want and convert them to promises
        const snapshot = await stories.once('value');
        const items = snapshot.val().slice(startIndex, endIndex);
        const itemFetches = items.map(itemID => {
            return new Promise((resolve, reject) => {
                const item = hn.child(`item/${itemID}`);
                item.once('value',
                    snap => resolve(snap.val()),
                    err => reject(err)
                );
            });
        });

        // return the formatted responses fetched from the server
        return Promise.all(itemFetches).then(res => {
            return res.filter(Boolean).map(item => {
                return shapeOutput(item);
            })
        });
    } catch(e) {
        console.error(e);
    }
}

/**
 * Retrieve a page of top stories
 * 
 * @param {object} options - an options object. Accepts page # and number of items. Defaults to 1 and 30 respectively
 * @param {function} fn - a callback function to be called on completion. Parameter 1 refers to errors while parameter 2 refers to responses
 */
module.exports.topstories = async function topstories(options, fn) {
    return await stories('topstories', options);
}

/**
 * Retrieve a page of new stories
 * 
 * @param {object} options - an options object. Accepts page # and number of items. Defaults to 1 and 30 respectively
 * @param {function} fn - a callback function to be called on completion. Parameter 1 refers to errors while parameter 2 refers to responses
 */
module.exports.newstories = async function newstories(options, fn) {
    return await stories('newstories', options);
}

/**
 * Retrieve a page of asks
 * 
 * @param {object} options - an options object. Accepts page # and number of items. Defaults to 1 and 30 respectively
 * @param {function} fn - a callback function to be called on completion. Parameter 1 refers to errors while parameter 2 refers to responses
 */
module.exports.askstories = async function askstories(options, fn) {
    return await stories('askstories', options);
}