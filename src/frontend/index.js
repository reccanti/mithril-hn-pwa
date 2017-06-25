import m from "mithril";
import App from "./views/App";
import List from "./views/List";

import topstories from "./models/topstories";

// import TopStoriesListView from "./TopStoriesListView"
// import NewStoriesListView from "./NewStoriesListView"

/**
 * Declare the routes for the app
 */
m.route(document.getElementById("app"), "/", {
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
                </App>
            );
        }
    },
});

window.m = m;