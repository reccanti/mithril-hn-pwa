import m from 'mithril';
import App from "../views/App";
import List from "../views/List";

import topstories from "../models/topstories";
import newstories from "../models/newstories";

/**
 * This defines how each route will be rendered.
 * It will be used to generate our routes on both
 * the client and server
 */
const routes = {
    "/": {
        render: () => {
            return (
                <App>
                    <List model={topstories} />
                </App>
            );
        }
    },
    "/newest": {
        render: () => {
            return (
                <App>
                    <List model={newstories} />
                </App>
            );
        }
    },
}

export default routes;