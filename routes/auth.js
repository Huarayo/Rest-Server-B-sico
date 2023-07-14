
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos')

const router = Router();

router.post('/login',[
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password','La contraseña debe se requerida').not().isEmpty(),
  validarCampos
], login) 

router.post('/google',[
  check('id_token', 'Google token es necesario').not().isEmpty(),
  validarCampos
], googleSignIn) 

module.exports = router;