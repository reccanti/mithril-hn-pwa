// disable dom check on node server
require('mithril/test-utils/browserMock')(global);
// const path = require('path');

const m = require('mithril')
const render = require('mithril-node-render')
const serve = require('koa-static')

const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const Session = require('koa-session');
const cors = require('kcors');
const hnAPI = require('./api');
const webRoutes = require('./routes');

const app = new Koa();
const appAPI = new Router();
const routes = new Router();

// declare session config
// const CONFIG = {
//     API_BASE: process.env.NOW_URL || 'localhost:8000'
// }

// declare routes 
appAPI.get('/', async ctx => {
    let params = {};
    if (ctx.query.page)
        params.page = ctx.query.page;
    ctx.body = await hnAPI.topstories(params);
});
appAPI.get('/newstories', async ctx => {
    let params = {};
    if (ctx.query.page)
        params.page = ctx.query.page;
    ctx.body = await hnAPI.newstories(params);
});

routes.use('/api', appAPI.routes(), appAPI.allowedMethods());
routes.use('', webRoutes.routes(), webRoutes.allowedMethods());

// console.log(routes.stack.map(i => console.log(i.path)));

// declare the app
// app.use(Session(CONFIG, app));
const corsURL = process.env.NOW_URL ? "https://mithril-hn-pwa.now.sh" : "http://localhost:8000";
app.use(cors({
    origin: corsURL
}));
app.use(json());
app.use(routes.routes());
app.use(serve('dist/static'));

console.log("listening at localhost:8000")
app.listen(8000);