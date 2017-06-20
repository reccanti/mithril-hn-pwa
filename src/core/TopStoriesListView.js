import m from "mithril"
import ListView from "./ListView"
import TopStories from "./TopStoriesList"

/**
 * A mithril component that uses the list view to 
 * display the Top Stories
 */
const TopStoriesListView = {
    oninit: () => {
        TopStories.loadList()
    },
    view: vnode => {
        const items = TopStories.list;
        return [
            <ListView list={items} />
        ]
    }
}
export default TopStoriesListView