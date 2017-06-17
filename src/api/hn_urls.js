/**
 * Contains references to the different hacker news API endpoints
 */
 
export const TOP_STORIES = () => `https://hacker-news.firebaseio.com/v0/topstories.json`
export const NEW_STORIES = () => `https://hacker-news.firebaseio.com/v0/newstories.json`
export const BEST_STORIES = () => `https://hacker-news.firebaseio.com/v0/beststories.json`

export const ITEM = itemid => `https://hacker-news.firebaseio.com/v0/item/${itemid}.json`
export const USER = userid => `https://hacker-news.firebaseio.com/v0/user/${userid}.json`