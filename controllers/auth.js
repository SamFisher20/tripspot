const user = require('../model/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new user({ email, username })
        const registeredUser = await user.register(newUser, password)
        req.login(registeredUser, e => {
            if (e) {
                req.flash('error', 'Something went wrong!!!')
                return res.redirect('/toursite')
            }
            req.flash('success', 'Welcome to trip-spot')
            res.redirect('/toursite')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Logged in successfully')
    const tempRedirect = req.session.returnTo || '/toursite'
    delete req.session.returnTo
    res.redirect(tempRedirect)
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Logged out')
    res.redirect('/toursite')
}