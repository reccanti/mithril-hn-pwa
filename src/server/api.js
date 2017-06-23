const firebase = require('firebase');


/**
 * An API to access HackerNews information. Inspired by 
 * https://github.com/cheeaun/node-hnapi
 */
firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
});
var hn = firebase.database().ref('/v0');

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
        Promise.all(itemFetches).then(res => {
            const apiRes = res.filter(Boolean).map(item => {
                const output = {
                    id: item.id,
                    title: item.title,
                    points: item.score,
                    user: item.by,
                    time: item.time,
                    comments_count: item.descendants || 0,
                };
                return output;
            });
            console.log(apiRes);
        });
    });
}

stories('topstories');