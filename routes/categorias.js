// const { Router } = require('express');
// const { check } = require('express-validator');

// const { validarJWT, validarCampos, esAdminRole } = require('../middleware');

// const {crearCategoria,
//       obtenerCategorias,
//       obtenerCategoria
//     } = require('../controllers/categorias');

// const { existeCategoriaPorId } = require('../helpers/db-validators');

// const router = Router();

// //Obtener todas las categorias - publico
// router.get('/', obtenerCategorias);

// // Obtener una categoria por id - público
// router.get('/:id',[
//   check('id', 'No es un id Mongo válido').isMongoId(),
//   check('id').custom( existeCategoriaPorId ),//si existe en la bbdd //validacion personalizada
//   validarCampos,
// ],obtenerCategoria);

// // Crear categoria - privado - cualquier persona con un token válido
// router.post('/', [
//   validarJWT,
//   check('nombre','El nombre es obligatorio').not().isEmpty(),
//   validarCampos,
// ], crearCategoria);

// module.exports = router;