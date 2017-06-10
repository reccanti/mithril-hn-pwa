// disable dom check on node server
require('mithril/test-utils/browserMock')(global);

const m = require('mithril');
const render = require('mithril-node-render');
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = await render(m('span', 'huhu'))
})

app.listen(8000)
