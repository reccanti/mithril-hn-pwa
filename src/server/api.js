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
 * Fetches a list of stories from the API
 */
function stories(base, options, fn) {
    const opts = Object.assign({ page: 1, limit: 30 }, options);
    const limit = opts.limit;
    const page = opts.page;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const stories = hn.child(base).limitToFirst(limit * page);
    stories.once('value', snapshot => {

        // get the subsection of itemIDs we want and convert them to promises
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

        // fetch all items and perform the callback on them
        Promise.all(itemFetches).then(res => {
            const apiRes = res.filter(Boolean).map(item => {
                return shapeOutput(item);
            });
            fn(null, apiRes);
        }).catch(err => fn(err));
    });
}

stories('topstories', {}, (err, res) => console.log(res));