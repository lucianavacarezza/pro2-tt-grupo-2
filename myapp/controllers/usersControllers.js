const db = require("../database/models")
const op = db.Sequelize.Op;

const usersController = {
    login: function (req, res) {
        return res.render("login" /* variable de db */)
    },
    profile: function (req, res) {

        let idUsuario = req.params.idUsuario;

        /*let criterio = {
            include: [
                {association: "productos"}
            ]
        }*/

        db.Usuario.findByPk(idUsuario)

            .then((result) => {
                return res.send(result)
                return res.render("profile", { usuario: result, producto : result.productos })
            }).catch((err) => {
                return console.log(err)
            });
    },
    profileEdit: function (req, res) {

        let idUsuario = req.params.idUsuario;
        db.Usuario.findByPk(idUsuario)

            .then((result) => {

                return res.render("profileEdit", { usuario: result })
            }).catch((err) => {
                return console.log(err)
            });
    },
    register: function (req, res) {
        return res.render("register" /* variable de db */)
    },
    create: function (req, res) {

        let form = req.body;
        let usuario ={
            nombre:form.nombre,
            email:form.email,
            contrasenia:form.contrasenia,
            dni:form.dni,
            fecha:form.fecha,
            foto:form.foto
        }
        db.Usuario.create(usuario)
        .then((result) => {
            return res.redirect("/users")
        }
        ).catch((err) => {
            return console.log(err);
        });

    },
    update: function (req, res) {

        let form = req.body;

        let filtrado = {
            where: {
                id: form.id
            }
        }

        db.Usuario.update(form, filtrado)
            .then((result) => {
                return res.redirect('/users/profile/id/' + form.id) /* esto está bien? no me salia de otra manera*/
            }).catch((err) => {
                return console.log(err);
            })

    },
}

module.exports = usersController
