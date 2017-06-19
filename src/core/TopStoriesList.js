import loadList from "./loadlist"
import * as URLS from "../api/hn_urls"

/**
 * A model to store the Top Stories list
 */
const TopStories = {
    list: [],
    loadList: () => {
         loadList(5, URLS.TOP_STORIES()).then(items => {
             console.log(items)
             TopStories.list = items
         })
    }
}
export default TopStories