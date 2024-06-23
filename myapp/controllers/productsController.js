const db = require("../database/models")
const { Op } = require("sequelize")
const { validationResult } = require("express-validator")

const productsController = {
    product: function (req, res) {
        let idProducto = req.params.idProducto;

        let criterio = {
            include: [
                {association: "usuario"},
                {association: "comentario",
                    include:[{association: "usuario"}]}
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        }

        db.Producto.findByPk(idProducto, criterio)
            .then(function (result) {
                //return res.send(result)
                return res.render("product",  { productos: result , sesion: res.locals.usuario }); 
            })
            .catch(function (err) {
                return console.log(err);
            })
    },
    add: function (req, res) {
        return res.render("productAdd",  {sesion: res.locals.usuario})
    },
    create: function (req, res) {
        let errors= validationResult(req)
        if (errors.isEmpty()) {
            let form = req.body;
        let producto = {
            nombreArchivoImagen: form.nombreArchivoImagen,
            nombre: form.nombre,
            descripcion: form.descripcion,
            idUsuario: form.idUsuario
        }
        db.Producto.create(producto)
            .then(function (result) {
                //return res.send(result)
                return res.redirect("/")
            })
            .catch(function (err) {
                return console.log(err);
            })
        } else {
            //return res.send(errors.mapped())
            return res.render("productAdd", {
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    edit: function (req, res) {
        let errors= validationResult(req)
        if (errors.isEmpty()) {
            let idProducto = req.params.idProducto;
            db.Producto.findByPk(idProducto)
                .then(function (result) {
                    //return res.send(result)
                    return res.render("productEdit", { productos: result , sesion: res.locals.usuario}); 
                })
                .catch(function (err) {
                    return console.log(err);
                })
        }else{
            return res.render("productEdit", {
                errors: errors.mapped(),
                old: req.body
            })
        }
       
    },
    delete: function (req, res) {
        let deleteProduct= req.params.id;
    
        db.Producto.delete({
            where: [
                {id: deleteProduct}
            ]
        })
        .then(function (req, res) {
            return res.redirect ("/", {sesion: res.locals.usuario});
        })
        .catch(function (err) {
            return console.log(err);
        })

    },
    update: function (req, res) {
        let form = req.body;
        let producto = {
            nombreArchivoImagen: form.nombreArchivoImagen,
            nombre: form.nombre,
            descripcion: form.descripcion
        }
        db.Producto.update(producto)
            .then(function (result) {
                return res.redirect("/", {sesion: res.locals.usuario})
            })
            .catch(function (err) {
                return console.log(err);
            })
    },
    results: function (req, res) {
        let busqueda = req.query.search;
        let filtrado = {
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: "%" + busqueda + "%" } },
                    { descripcion: { [Op.like]: "%" + busqueda + "%" } }
                ]
            },
            include: [
                //{association: "comentario"},
                {association: "comentario",
                    include:[{association: "usuario"}]}
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        }
        db.Producto.findAll(filtrado)
            .then(function (result) {
                //return res.send(result)
                return res.render("searchResults", { productos: result, busqueda: busqueda , sesion: res.locals.usuario });
            })
            .catch(function (err) {
                return console.log(err);
            })
    },
    createComentario: function (req, res) {
        let form = req.body

        let comentario = {
            idProducto : form.idProducto,
            idUsuario: form.idUsuario,
            texto: form.texto
        }


        db.Comentario.create(comentario)
            .then(function (result) {
                //return res.send(result)
                return res.redirect('/products/id/' + comentario.idProducto)
            }).catch(function (err) {
                return console.log(err);
            })

        
    }
}

module.exports = productsController