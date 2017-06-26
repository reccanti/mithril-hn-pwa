import m from "mithril"

/**
 * A mithril component that stores a list view for the site
 */
const List = {
    oninit: async vnode => {
        this.items = [];
        this.items = await vnode.attrs.model.loadList();
        m.redraw();
    },
    onupdate: async vnode => {
        this.items = await vnode.attrs.model.loadList();
    },
    view: vnode => {
        return [
            <div>
                <div>prev page next</div>
                <ul>
                    { this.items.map( item => <li><a href={item.url}>{item.title}</a></li> ) }
                </ul>
            </div>
        ]
    }
}

/**
 * A factory function which is used to generate
 * list objects for different models
 * 
 * @param {object} model - the data model used for this
 * specific list
 */
function ListFactory(model) {
    return <List model={model} />
}

export { ListFactory }
export default List