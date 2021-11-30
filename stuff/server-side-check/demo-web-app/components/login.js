const { openHtml, closeHtml } = require('../helpers')

function login(args = {}) {
    const { username, feedback } = args
    return `${openHtml}
            <h1>Sign In</h1>
            <form method="POST" action="/login">
                <input type="text" name="username" placeholder="username" required ${username ? `value="${username}"` : ''}>
                <input type="password" name="password" placeholder="password" required>
                <button>Sign In</button>
                ${feedback ? `<p>${feedback}</p>` : ''}
            </form>
        ${closeHtml}`
}

module.exports = login