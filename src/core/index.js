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

const ListView = {
    oninit: TopStories.loadList,
    view: vnode => {
        const items = TopStories.list();
        console.log(items);
        return [
            <ul>
                { items.map( item => <li><a href={item.url}>{item.title}</a></li> ) }
            </ul>
        ]
    }
}

m.route(document.getElementById("app"), "/", {
    "/": ListView
});