// disable dom check on node server
require('mithril/test-utils/browserMock')(global);
const m = require("mithril")

/**
 * This component describes the overall layout of the app
 * when it is rendered on the server. 
 */
const Layout = {
    view: vnode => {
        return [
            <html lang="en">
                <head>
                    <title>Mithril App</title>
                </head>
                <body>
                    <div id="app">
                        { vnode.children }
                    </div>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        ]
    }
}

module.exports = Layout