var express              = require('express');
var router               = express.Router();
const productsController = require ("../controllers/productsController")
const { body }           = require("express-validator");
const validaciones = [
  body('nombreArchivoImagen').notEmpty().withMessage("Completar este campo").bail(),
  body('nombre').notEmpty().withMessage("Completar este campo").bail(),
  body('descripcion').notEmpty().withMessage("Completar este campo").bail(),
];

let validacionesComentario = [
  body("texto")
  .notEmpty().withMessage("El comentario no puede enviarse vacío").bail()
  .isLength({min:3}).withMessage("El comentario debe tener al menos 3 caracteres")
]
/* GET home page. */
router.get('/id/:idProducto', productsController.product ); //  se va a relacionar con product.ejs
router.post('/id/:idProducto', validacionesComentario, productsController.createComentario)
router.get('/add', productsController.add ); //  se va a relacionar con productAdd.ejs 
router.post('/add', validaciones, productsController.create);
router.get('/edit/id/:idProducto', productsController.edit);
router.post('/edit/id/:idProducto', validaciones,  productsController.update);
router.get ('/results', productsController.results );
router.get('/delete/id/:idProducto/:idUsuario', productsController.delete);

  module.exports = router; 