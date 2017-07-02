import m from "mithril";
import routes from '../common/routes/routes';

// get the pathname of the url
const path = window.location.pathname + window.location.search;

// reset the url to root if JavaScript is enabled
history.pushState(null, null, '/');

// declare routes
m.route(document.getElementById("app"), path, routes);