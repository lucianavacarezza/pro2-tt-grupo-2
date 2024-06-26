const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator")
const db = require("../database/models")
const op = db.Sequelize.Op;

const usersController = {
    login: function (req, res) {  
         return res.render("login" , {sesion: res.locals.usuario})
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
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        }
        db.Usuario.findByPk(idUsuario, criterio)

            .then((result) => {
               // return res.send( { usuario: result , sesion: res.locals.usuario })
                return res.render("profile", { usuario: result , sesion: res.locals.usuario })
            }).catch((err) => {
                return console.log(err)
            });
    },
    profileEdit: function (req, res) {

        let idUsuario = req.params.idUsuario;
        db.Usuario.findByPk(idUsuario)

            .then((result) => {
                //return res.send({usuario: result, sesion: res.locals.usuario})
                return res.render("profileEdit", { usuario: result, sesion: res.locals.usuario })
            }).catch((err) => {
                return console.log(err)
            });
    },
    register: function (req, res) {
        return res.render("register", {sesion: res.locals.usuario})
    },
    create: function (req, res) {

        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let form = req.body;

            let passEncriptada = bcrypt.hashSync(form.contrasenia, 10)

            if (form.foto == "") {
                fotoPerfil = "defaultImage.png"
            } else {
                fotoPerfil = form.foto
            }

            let usuario = {
                nombre: form.nombre,
                email: form.email,
                contrasenia: passEncriptada,
                dni: form.dni,
                fecha: form.fecha,
                foto: fotoPerfil
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
                old: req.body,
                usuario: req.session.usuario
            })
        }
    },
    update: function (req, res) {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let form = req.body;

        let passEncriptada = bcrypt.hashSync(form.contrasenia, 10)

        let update = {
            id: form.id,
            email: form.email,
            nombre: form.nombre,
            contrasenia: passEncriptada,
            fecha: form.fecha,
            dni: form.dni,
            foto: form.foto
        }

        let filtrado = {
            where: {
                id: form.id
            }
        }

        db.Usuario.update(update, filtrado)
            .then((result) => {
                res.locals.usuario = update
                return res.redirect('/users/profile/id/' + form.id) /* esto está bien? no me salia de otra manera*/
            }).catch((err) => {
                return console.log(err);
            })
        } else {
            //return res.send ({ sesion: req.session.usuario, errores: errors.mapped()})
            return res.render("profileEdit", {
                errors: errors.mapped(),
                old: req.body,
                sesion: req.body
            })
        }
    },
    loginUser: function (req, res) {

        let form = req.body

        let filtro = {
            where: [{email : form.email}]
        }

        db.Usuario.findOne(filtro)
        .then ((result) => {
            //return res.send(form.contrasenia)
            if (result != null) {
                let check = bcrypt.compareSync(form.contrasenia, result.contrasenia)
                //return res.send({contrasenia : form.contrasenia, hasheada: result.contrasenia, resultado : check, find: result})

                if (check) {
                    req.session.usuario = result;
                    if (form.baja != undefined) {
                        res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                    } else { 
                        res.session = result
                    }
                    return res.redirect("/")
                } else {
                    return res.send("error en la contraseña");

                }

            } else {
                return res.send("No hay mails parecidos a : " + form.email);
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
