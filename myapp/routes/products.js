var express              = require('express');
var router               = express.Router();
const productsController = require ("../controllers/productsController")

/* GET home page. */
router.get('/', productsController.product ); //  se va a relacionar con product.ejs 
router.get('/add', productsController.add ); //  se va a relacionar con productAdd.ejs 
router.get ('/results', productsController.results );

  module.exports = router; 