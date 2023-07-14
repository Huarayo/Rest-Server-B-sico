
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');

const router = Router();

router.post( '/', cargarArchivo );

router.put( '/:coleccion/:id',[
  check('id','El id tiene que ser de mongoDb').isMongoId(),
  check('coleccion',)
],actualizarImagen )

module.exports = router;