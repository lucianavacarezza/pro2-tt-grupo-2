var express              = require('express');
var router               = express.Router();
const productsController = require ("../controllers/productsController")
const { body }           = require("express-validator");
const validaciones = [
  body('nombreArchivoImagen').notEmpty().withMessage("Completar este campo").bail(),
  body('nombre').notEmpty().withMessage("Completar este campo").bail(),
  body('descripcion').notEmpty().withMessage("Completar este campo").bail(),
];
/* GET home page. */
router.get('/id/:idProducto', productsController.product ); //  se va a relacionar con product.ejs
router.post('/id/:idProducto', productsController.createComentario)
router.get('/add', productsController.add ); //  se va a relacionar con productAdd.ejs 
router.post('/add', validaciones, productsController.create);
router.get('/edit/id/:idProducto', productsController.edit);
router.post('/edit/id/:idProducto', validaciones,  productsController.update);
router.get ('/results', productsController.results );
router.post('/delete/id/:idProducto', productsController.delete);

  module.exports = router; 