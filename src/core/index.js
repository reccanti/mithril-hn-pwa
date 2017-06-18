import m from "mithril"
import App from "./app.js"

m.route(document.getElementById("app"), "/", {
    "/": App
});