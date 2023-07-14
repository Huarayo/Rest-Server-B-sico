const { Router } = require("express");
const { check } = require("express-validator");


const {
  validarCampos,
  validarJWT,
  esAdminRole
} = require('../middleware');

const {
  esRolValido,
  EmailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
    check("id", "NO es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check("rol").custom(esRolValido), //el parametro se obvia
    check("correo").custom(EmailExiste),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "NO es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
