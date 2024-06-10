const db = require("../database/models")
const { Op } = require("sequelize")

const productsController = {
    product: function (req, res) {
        let idProducto = req.params.idProducto;

        let criterio = {
            include: [
                {association: "usuario"},
                {association: "comentario",
                    include:[{association: "usuario"}]}
            ]
        }
        db.Producto.findByPk(idProducto, criterio)
            .then(function (result) {
                // return res.send(result)
                return res.render("product", { productos: result }); //cuando es sin la vista me trae todos pero cuando pongo la vista solo me trae uno y sin la imagen ni nada
            })
            .catch(function (err) {
                return console.log(err);
            })
    },
    add: function (req, res) {
        return res.render("productAdd", /**/)
    },
    create: function (req, res) {
        let form = req.body;
        let producto = {
            nombreArchivoImagen: form.nombreArchivoImagen,
            nombre: form.nombre,
            descripcion: form.descripcion
        }
        db.Producto.create(producto)
            .then(function (result) {
                return res.redirect("/")
            })
            .catch(function (err) {
                return console.log(err);
            })
    },
    edit: function (req, res) {
        let idProducto = req.params.idProducto;
        db.Producto.findByPk(idProducto)
            .then(function (result) {
                return res.render("productEdit", { productos: result }); //cuando es sin la vista me trae todos pero cuando pongo la vista solo me trae uno y sin la imagen ni nada
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
                return res.redirect("/")
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
                return res.render("searchResults", { productos: result, busqueda: busqueda });
            })
            .catch(function (err) {
                return console.log(err);
            })
    }
}

module.exports = productsController