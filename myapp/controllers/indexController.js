const db = require ("../database/models");
// cuando hagamos el modelo usemos la referencia del ppt= const movie= db.alias delmmodelo
const indexController = {
    index: function (req, res) {
        return res.render ("index", {data: db.productos})
    }
}

module.exports = indexController