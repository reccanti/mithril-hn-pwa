import m from "mithril"
import ListView from "./ListView"
import TopNav from "./TopNav"

/**
 * The main app wrapper
 */
const App = {
    view: vnode => {
        return [
            <main>
                <TopNav />
                { vnode.children }
            </main>
        ]
    }
}

export default App