import m from "mithril"
import ListView from "./ListView"
import TopNav from "./TopNav"

/**
 * The main app wrapper
 */
const App = {
    oninit: vnode => {
        console.log(vnode.attrs.model)
        vnode.attrs.model.loadList()
    },
    view: vnode => {
        return [
            <main>
                <TopNav />
                <ListView list={vnode.attrs.model.list}/>
            </main>
        ]
    }
}

export default App