const { openHtml, closeHtml } = require('../helpers')

function register(args = {}) {
    const { name, username, feedback } = args
    return `${openHtml}
            <h1>Demo Web-App</h1>
            <h1>Sign up</h1>
            <form method="POST" action="/register">
                <input type="text" name="name" placeholder="name" required ${name ? `value="${name}"` : ''}>
                <input type="text" name="username" placeholder="username" required ${username ? `value="${username}"` : ''}>
                <input type="password" name="password" placeholder="password" required>
                <button>Sign up</button>
                ${feedback ? `<p>${feedback}</p>` : ''}
            </form>
        ${closeHtml}`
}

module.exports = register