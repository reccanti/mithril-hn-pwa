import m from "mithril"

/**
 * A mithril component that stores a list view for the site
 */
const List = {
    oninit: vnode => {
        vnode.attrs.model.loadList();
    },
    onupdate: vnode => {
        m.redraw();
    },
    view: vnode => {
        console.log(vnode.attrs.model.list);
        return [
            <div>
                <div>prev page next</div>
                <ul>
                    { vnode.attrs.model.list.map(item => <li><a href={item.url}>{item.title}</a></li>) }
                </ul>
            </div>
        ]
    }
}

export default List