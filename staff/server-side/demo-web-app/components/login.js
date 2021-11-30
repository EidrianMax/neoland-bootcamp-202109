const { openHtml, closeHtml } = require('../loggers')

function login(args = {}) {
    const { username, feedback } = args
    return `${openHtml}
            <h1>Sign In</h1>
            <form method="POST" action="/signin">
                <input type="text" name="username" placeholder="username" required ${username ? `value="${username}"` : ''}>
                <input type="password" name="password" placeholder="password" required>
                <button>Sign In</button>
                ${feedback ? `<p>${feedback}</p>` : ''}
            </form>
        ${closeHtml}`
}

module.exports = login