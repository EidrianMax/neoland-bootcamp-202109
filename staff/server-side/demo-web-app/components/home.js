const { openHtml, closeHtml } = require('../loggers')

function home(args = {}) {
    // const { user } = args
    return `${openHtml}
                <h1>Welcome User</h1>
            ${closeHtml}`
}

module.exports = home