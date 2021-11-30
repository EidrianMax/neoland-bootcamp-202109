const { openHtml, closeHtml } = require('../helpers')

function postRegister(args = {}) {
    return `${openHtml}
                <h1>User successfully registered</h1>
                <p>Proceed to <a href="/login">Sign in</a>.</p>
            ${closeHtml}`
}

module.exports = postRegister