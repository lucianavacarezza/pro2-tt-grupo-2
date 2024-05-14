var express           = require('express');
var router            = express.Router();
const usersController = require("../controllers/usersControllers")

/* GET users listing. */
router.get('/', usersController.login ); //  se va a relacionar con login.ejs 
router.get('/profile', usersController.profile ); //  se va a relacionar con profile.ejs 
router.get('/profile/edit', usersController.profileEdit ); //  se va a relacionar con profileEdit.ejs 
router.get('/register', usersController.register ); //  se va a relacionar con register.ejs 


module.exports = router;
