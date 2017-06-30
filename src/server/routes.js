
const m = require('mithril')
const render = require('mithril-node-render')
const Router = require('koa-router');

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
            const component = mithrilRoutes[route];
            ctx.body = await render(component);
            console.log(ctx.body);
        });
    });
    return router;
}

module.exports = generateRoutes();