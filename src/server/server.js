// disable dom check on node server
require('mithril/test-utils/browserMock')(global);
const path = require('path');

const m = require('mithril')
const render = require('mithril-node-render')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

const Layout = require("./layout")

const STATIC_PATH = path.resolve(__dirname, '..', 'static')

app.use(serve(STATIC_PATH))
app.use(async ctx => {
    let html = await render(Layout)
    html = `<!DOCTYPE html>` + html
    // console.log(html)
    ctx.body = html
})

console.log("listening at localhost:8000")
app.listen(8000)
