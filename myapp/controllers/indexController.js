const db = require ("../database/models");
// cuando hagamos el modelo usemos la referencia del ppt= const movie= db.alias delmmodelo
const indexController = {
    index: function (req, res) {
        db.Producto.findAll()
        .then(function(result){
            return res.render ("index", {productos: result})
        })
        .catch(function (err) {
            return console.log(err);
        })
    }
}

module.exports = indexController