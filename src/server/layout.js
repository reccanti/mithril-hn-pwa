// disable dom check on node server
require('mithril/test-utils/browserMock')(global);
const m = require("mithril")

const Layout = {
    view: vnode => {
        return [
            <html lang="en">
                <head>
                    <title>Mithril App</title>
                </head>
                <body>
                    <div id="app"></div>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        ]
    }
}

module.exports = Layout