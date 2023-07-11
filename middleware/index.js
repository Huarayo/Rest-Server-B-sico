
const validarCampos = require("../middleware/validar-campos");
const validarJWT = require("../middleware/validar-jwt");
const esAdminRole = require("../middleware/validar-roles");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...esAdminRole
}