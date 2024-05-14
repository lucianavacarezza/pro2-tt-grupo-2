const db = require ("../db/database")

const indexController = {
    index: function (req, res) {
        return res.render ("index", {data: db.productos})
    }
}

module.exports = indexController