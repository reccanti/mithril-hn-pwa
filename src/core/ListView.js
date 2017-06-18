import m from "mithril"
import stream from "mithril/stream"
import * as URLS from "../api/hn_urls"

const TopStories = {
    list: stream([]),
    loadList: () => {
         return m.request({
             method: "GET",
             url: URLS.TOP_STORIES()
         }).then(itemids => {
            return Promise.all(itemids.slice(0, 30).map(id => {
                return m.request({
                    "method": "GET",
                    url: URLS.ITEM(id)
                })
            }))
         }).then(TopStories.list)
    }
}

/**
 * A mithril component that stores a list view for the site
 */
const ListView = {
    oninit: TopStories.loadList,
    view: vnode => {
        const items = TopStories.list();
        console.log(items);
        return [
            <div>
                <div>prev page next</div>
                <ul>
                    { items.map( item => <li><a href={item.url}>{item.title}</a></li> ) }
                </ul>
            </div>
        ]
    }
}

export default ListView