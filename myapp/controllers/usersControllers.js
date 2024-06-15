const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator")
const db = require("../database/models")
const op = db.Sequelize.Op;

const usersController = {
    login: function (req, res) {  
         return res.render("login" /* variable de db */)
    },
    profile: function (req, res) {

        let idUsuario = req.params.idUsuario;

        let criterio = {
            include: [
                {
                    association: "productos",
                    include: [{ association: "comentario" }]
                },
                { association: "comentario" }
            ]
        }
        db.Usuario.findByPk(idUsuario, criterio)

            .then((result) => {
                return res.render("profile", { usuario: result })
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

        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let form = req.body;

            let passEncriptada = bcrypt.hashSync(form.contrasenia, 11)

            let usuario = {
                nombre: form.nombre,
                email: form.email,
                contrasenia: passEncriptada,
                dni: form.dni,
                fecha: form.fecha,
                foto: form.foto
            }
            if (usuario.foto == "") {
                usuario.foto = "defaultImage.png"
            }

            db.Usuario.create(usuario)
                .then((result) => {
                    return res.redirect("/users")
                }
                ).catch((err) => {
                    return console.log(err);
                });


        } else {
            //return res.send(errors.mapped())
            return res.render("register", {
                errors: errors.mapped(),
                old: req.body
            })
        }



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
    loginUser: function (req, res) {

        let form = req.body

        let filtro = {
            where: [{nombre : form.nombre}]
        }

        db.Usuario.findOne(filtro)
        .then ((result) => {
            //return res.send(form.contrasenia)
            if (result != null) {
                req.session.usuario = result;

                //return res.send({contrasenia:form.contrasenia, hasheada:result.contrasenia })
                
                //let check = bcrypt.compareSync(form.contrasenia, result.contrasenia)
                //return res.send(result)

                //if (check) {
                  //  req.session.usuario = result;
                    if (form.baja != undefined) {
                        res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                    }
                    return res.redirect("/")
                //} else {
                    return res.send("error en la contraseña");

                //}

            } else {
                return res.send("No hay usuarios parecidos a : " + form.nombre);
            }

            
        }).catch((err) => {
            return console.log(err);
        })
        
    },
    logOut: function (req,res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/")
    }
}

module.exports = usersController
