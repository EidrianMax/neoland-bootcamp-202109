const { openHtml, closeHtml } = require('../loggers')

function postRegister(args = {}) {
    return `${openHtml}
                <h1>User successfully registered</h1>
                <p>Proceed to <a href="/signin">Sign in</a>.</p>
            ${closeHtml}`
}

module.exports = postRegister