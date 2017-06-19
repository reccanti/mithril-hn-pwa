import m from "mithril"
import stream from "mithril/stream"
import * as URLS from "../api/hn_urls"

/**
 * A function that loads the top stories list 
 */
function loadTopStoriesList(batchSize) {
    return m.request({
        method: "GET",
        url: URLS.TOP_STORIES()
    }).then(itemIds => {
        
        // partition list into batches
        let partitions = []
        let index = 0
        while (index < itemIds.length) {
            partitions.push(itemIds.slice(index, index + batchSize))
            index += batchSize
        }

        // fetch the results from each partition
        return Promise.all(partitions.map(batch => {
            return fetchBatch(batch)
        }))
    }).then(itemBatches => {
        return itemBatches.reduce((list, batch) => {
            return list.concat(batch)
        }, [])

    })
}

/**
 * Get the results of a batch of itemIds
 * 
 * @param {number[]} batch - an array of itemIds 
 */
function fetchBatch(batch) {
    return Promise.all(batch.map(itemId => {
        return m.request({
            method: "GET",
            url: URLS.ITEM(itemId)
        })
    }))
}

const TopStories = {
    list: [],
    loadList: () => {
         loadTopStoriesList(5).then(items => {
             console.log(items)
             TopStories.list = items
         })
    }
}

/**
 * A mithril component that stores a list view for the site
 */
const ListView = {
    oninit: TopStories.loadList,
    view: vnode => {
        const items = TopStories.list;
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