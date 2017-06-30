const m = require('mithril');
const App = require( "../../frontend/views/App");
const List = require("../../frontend/views/List");

const topstories = require("../../frontend/models/topstories");
const newstories = require("../../frontend/models/newstories");

/**
 * This defines how each route will be rendered.
 * It will be used to generate our routes on both
 * the client and server
 */
const routes = {
    "/": {
        view: () => {
            return (
                <App>
                    <List model={topstories} />
                </App>
            );
        }
    },
    "/newest": {
        view: () => {
            return (
                <App>
                    <List model={newstories} />
                </App>
            );
        }
    },
}

module.exports = routes;