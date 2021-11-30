const { openHtml, closeHtml } = require('../helpers')

function postUnregister() {
    return `${openHtml}
                <h1>You have unregistered succssesfully</h1>
                <p><a href="/exit">Go Back</a></p>
            ${closeHtml}`
}

module.exports = postUnregister