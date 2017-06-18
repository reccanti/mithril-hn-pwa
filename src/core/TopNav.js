import m from "mithril"

/**
 * A Mithril component that displays the top navigation of 
 * the site
 */
const TopNav = {
    view: vnode => {
        return (
            <nav>Mithril HN <a href="/new" oncreate={ m.route.link }>new</a> <a href="/comments" oncreate={ m.route.link }>comments</a> <a href="/show" oncreate={ m.route.link }>show</a> <a href="/ask" oncreate={ m.route.link }>ask</a> <a href="/jobs" oncreate={ m.route.link }>jobs</a></nav>
        )
    }
}

export default TopNav