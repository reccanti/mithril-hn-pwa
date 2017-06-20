import m from "mithril"
import App from "./app.js"

import TopStoriesListView from "./TopStoriesListView"
import NewStoriesListView from "./NewStoriesListView"

/**
 * Declare the routes for the app
 */
m.route(document.getElementById("app"), "/", {
    "/": {
        render: () => {
            return [
                <App>
                    <TopStoriesListView />
                </App>
            ]
        }
    },
    "/newest": {
        render: () => {
            return [
                <App>
                    <NewStoriesListView />
                </App>
            ]
        }
    },
});