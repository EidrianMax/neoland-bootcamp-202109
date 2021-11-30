const { openHtml, closeHtml } = require('../helpers')

function landing(args = {}) {
    return `${openHtml}
                <h1>Landing</h1>
                <p><a href="/register">Register</a></p>
                <p><a href="/login">Login</a></p>
            ${closeHtml}`
}

module.exports = landing