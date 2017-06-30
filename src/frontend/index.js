import m from "mithril";
import routes from '../common/routes/routes';


// import TopStoriesListView from "./TopStoriesListView"
// import NewStoriesListView from "./NewStoriesListView"

/**
 * Declare the routes for the app
 */
m.route(document.getElementById("app"), "/", routes);

window.m = m;