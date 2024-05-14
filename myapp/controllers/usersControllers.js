const user = require ("../db/database")

const usersController = {
    login: function (req, res) {
        return res.render ("login" /* variable de db */)
    },
    profile: function (req, res) {
        return res.render ("profile", {usuario: user.usuario, producto: user.productos})
    },
    profileEdit: function (req, res) {
        return res.render ("profileEdit", {usuario: user.usuario})
    },
    register: function (req, res) {
        return res.render("register" /* variable de db */)
    }
}

module.exports = usersController
