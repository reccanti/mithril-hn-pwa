
const m = require('mithril')
const render = require('mithril-node-render')
const Router = require('koa-router');

const Layout = require('./layout');
const mithrilRoutes = require('../common/routes/routes');

/**
 * A function to generate koa routes from mithril
 * routes
 * 
 * @param {object} mithrilRoutes 
 */
function generateRoutes() {
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

module.exports = generateRoutes();