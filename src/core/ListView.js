import m from "mithril"
import stream from "mithril/stream"

/**
 * A mithril component that stores a list view for the site
 */
const ListView = {
    view: vnode => {
        console.log(vnode.attrs)
        const items = vnode.attrs.list;
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