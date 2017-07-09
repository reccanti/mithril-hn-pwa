// disable dom check on node server
require('mithril/test-utils/browserMock')(global);

const m = require('mithril')
const render = require('mithril-node-render')
const serve = require('koa-static')

const Koa = require('koa');
const json = require('koa-json');
const Session = require('koa-session');
const cors = require('kcors');
const routes = require('./routes');

const app = new Koa();

// declare the app
const corsURL = process.env.NOW_URL ? "https://mithril-hn-pwa.now.sh" : "http://localhost:8000";
app.use(cors({
    origin: corsURL
}));
app.use(json());
app.use(routes.routes());
app.use(serve('dist/static'));

console.log("listening at localhost:8000")
app.listen(8000);