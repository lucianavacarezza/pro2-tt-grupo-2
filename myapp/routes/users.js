var express           = require('express');
var router            = express.Router();
const usersController = require("../controllers/usersControllers")

/* GET users listing. */
router.get('/', usersController.login ); //  se va a relacionar con login.ejs 
router.get('/profile/id/:idUsuario', usersController.profile ); //  se va a relacionar con profile.ejs 
router.get('/profile/edit/:idUsuario', usersController.profileEdit ); //  se va a relacionar con profileEdit.ejs
router.post('/profile/edit/:idUsuario', usersController.update)
router.get('/register', usersController.register ); //  se va a relacionar con register.ejs 
router.post('/register', usersController.create);


module.exports = router;
