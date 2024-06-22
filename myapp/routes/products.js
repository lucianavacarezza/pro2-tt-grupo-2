var express              = require('express');
var router               = express.Router();
const productsController = require ("../controllers/productsController")

/* GET home page. */
router.get('/id/:idProducto', productsController.product ); //  se va a relacionar con product.ejs
router.post('/id/:idProducto', productsController.createComentario)
router.get('/add', productsController.add ); //  se va a relacionar con productAdd.ejs 
router.post('/add', productsController.create);
router.get('/edit/id/:idProducto', productsController.edit);
router.post('/edit/id/:idProducto', productsController.update);
router.get ('/results', productsController.results );


  module.exports = router; 