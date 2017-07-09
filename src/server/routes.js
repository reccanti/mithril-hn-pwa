
const m = require('mithril')
const render = require('mithril-node-render')
const Router = require('koa-router');
const Layout = require('./Layout');
const mithrilRoutes = require('../common/routes/routes');

const apiRoutes = new Router();
const routes = new Router();

// declare API routes
apiRoutes.get('/', async ctx => {
    let params = {};
    if (ctx.query.page)
        params.page = ctx.query.page;
    ctx.body = await hnAPI.topstories(params);
});
apiRoutes.get('/newstories', async ctx => {
    let params = {};
    if (ctx.query.page)
        params.page = ctx.query.page;
    ctx.body = await hnAPI.newstories(params);
});
apiRoutes.get('/askstories', async ctx => {
    let params = {};
    if (ctx.query.page)
        params.page = ctx.query.page;
    ctx.body = await hnAPI.askstories(params);
});


/**
 * A function to generate koa web routes from mithril routes
 * 
 * @param {object} mithrilRoutes 
 */
function generateWebRoutes(mithrilRoutes) {
    const router = new Router();
    Object.keys(mithrilRoutes).forEach(route => {
        router.get(route, async ctx => {
            const Component = mithrilRoutes[route];
            let bodyHTML = await render(<Layout><Component /></Layout>);
            ctx.body = `<!DOCTYPE html>${bodyHTML}`
        });
    });
    return router;
}

const webRoutes = generateWebRoutes(mithrilRoutes);

// export the routes object for the server
routes.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
routes.use('', webRoutes.routes(), webRoutes.allowedMethods());
module.exports = routes;