
const Categoria = require('./categoria');
const Role = require('./role');
const Server = require('./server');
const UsuarioModel = require('./usuario');

module.exports = {
  ...Categoria,
  ...Role,
  ...Server,
  ...UsuarioModel
}