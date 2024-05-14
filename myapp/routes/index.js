var express           = require('express');
var router            = express.Router();
const indexController = require ("../controllers/indexController")

/* GET home page. */
router.get('/', indexController.index ); //  se va a relacionar con index.ejs 

module.exports = router;
