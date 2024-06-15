var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersControllers");
const db = require("../database/models")
const { body } = require("express-validator");
let validaciones = [
    body("email")
        .notEmpty().withMessage("Completar este campo").bail()
        .isEmail().withMessage("Ingresar un mail válido").bail()
        .custom(function (value, {req}) {
            return db.Usuario.findOne({
                where: { email: req.body.email }
            })
                .then(function (usuario) {
                    if (usuario) {
                        throw new Error("El mail ingresado ya existe")
                    }
                })
        }),
    body("nombre")
    .notEmpty().withMessage("Completar este campo").bail()
    .isString().withMessage("Ese formato no es permitido"),
    body("contrasenia")
    .notEmpty().withMessage("Completar este campo").bail()
    .isLength({min:4}).withMessage("La contraseña debe tener al menos 4 caracteres").bail(),
    body("foto")
    .custom(function (value, {req}) {
        if (!value || value == "") {
            req.body.foto = "defaultImage.png"
        }
        return true;
    })
    .isString().withMessage("Ese formato no es permitido")
    
]

/* GET users listing. */
router.get('/', usersController.login); //  se va a relacionar con login.ejs 
router.post('/', usersController.loginUser)
router.get('/profile/id/:idUsuario', usersController.profile); //  se va a relacionar con profile.ejs 
router.get('/profile/edit/:idUsuario', usersController.profileEdit); //  se va a relacionar con profileEdit.ejs
router.post('/profile/edit/:idUsuario', usersController.update)
router.get('/register', usersController.register); //  se va a relacionar con register.ejs 
router.post('/register', validaciones, usersController.create);


module.exports = router;
