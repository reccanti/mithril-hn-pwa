const m = require('mithril');
const App = require( "../../frontend/views/App");
const List = require("../../frontend/views/List");

const topstories = require("../../frontend/models/topstories");
const newstories = require("../../frontend/models/newstories");
const askstories = require("../../frontend/models/askstories");
const showstories = require("../../frontend/models/showstories");
const jobstories = require("../../frontend/models/jobstories");

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
    "/ask": {
        view: () => {
            return (
                <App>
                    <List model={askstories} />
                </App>
            );
        }
    },
    "/show": {
        view: () => {
            return (
                <App>
                    <List model={showstories} />
                </App>
            );
        }
    },
    "/jobs": {
        view: () => {
            return (
                <App>
                    <List model={jobstories} />
                </App>
            );
        }
    },
}

module.exports = routes;