const { openHtml, closeHtml } = require('../helpers')

function fail(args = {}) {
    return `${openHtml}
                <h1>${args.message}</h1>
            ${closeHtml}`
}

module.exports = fail