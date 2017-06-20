import loadList from "./loadlist"
import * as URLS from "../api/hn_urls"

/**
 * A model to store the New Stories list
 */
const NewStories = {
    list: [],
    loadList: () => {
         loadList(5, URLS.NEW_STORIES()).then(items => {
             console.log(items)
             NewStories.list = items
         })
    }
}
export default NewStories