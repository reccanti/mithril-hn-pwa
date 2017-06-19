import m from "mithril"
import App from "./app.js"

import TopStories from "./TopStoriesList"

m.route(document.getElementById("app"), "/", {
    "/": {
        render: () => {
            return <App model={TopStories} />
        }
    }
});