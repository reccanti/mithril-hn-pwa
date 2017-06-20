import m from "mithril"
import * as URLS from "../api/hn_urls"

/**
 * A function that loads an hn list froma URL
 */
function loadList(batchSize, url) {
    return m.request({
        method: "GET",
        url: url
    }).then(itemIds => {
        
        console.log(itemIds)
        
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

export default loadList