const { openHtml, closeHtml } = require('../helpers')

function unregister(args = {}) {
    const { feedback } = args
    return `${openHtml}
            <h1>Unregister</h1>
            <form method="POST" action="/unregister">
                <input type="password" name="password" placeholder="password">
                <button>Unregister</button>
                ${feedback ? `<p>${feedback}</p>` : ''}
            </form>
        ${closeHtml}`
}

module.exports = unregister