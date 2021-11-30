const { openHtml, closeHtml } = require('../helpers')

function home(args = {}) {
    const { username } = args
    return `${openHtml}
                <h1>Hello, ${username}!</h1>
                <a href="/unregister">Unregister</a>
                <a href="/exit">Exit</a>
            ${closeHtml}`
}

module.exports = home