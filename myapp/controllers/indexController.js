const db = require ("../database/models");
// cuando hagamos el modelo usemos la referencia del ppt= const movie= db.alias delmmodelo
const indexController = {
    index: function (req, res) {
        let filtrado = {
            order: [
                ["createdAt", "DESC"]
            ]
        }
        db.Producto.findAll(filtrado)
        .then(function(result){
            return res.render ("index", {productos: result , sesion: res.locals.usuario})
        })
        .catch(function (err) {
            return console.log(err);
        })
    }
}

module.exports = indexController