const { openHtml, closeHtml } = require('../loggers')

function landing(args = {}) {
    return `${openHtml}
                <h1>Landing</h1>
                <p><a href="/unregister">Unregister</a></p>
                <p><a href="/update-password">Change Password</a></p>
            ${closeHtml}`
}

module.exports = landing