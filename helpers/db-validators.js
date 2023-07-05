const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async(rol='') => {
  const existeRol = await Role.findOne({ rol });
  if( !existeRol ) {
    throw new Error("El rol " + rol + " está registrado en la base de datos");
  }
}

const EmailExiste = async( correo='' ) => {
  const existeEmail = await Usuario.findOne({ correo });
  if( existeEmail ) {
      throw new Error('Ese correo ya esta registrado: ' + correo);
  }
}

const existeUsuarioPorId = async( id ) => {

  const existeUsuario = await Usuario.findById(id);
  if( !existeUsuario ) {
    throw new Error(`El id no existe ${id}`);
  }
}


module.exports = {
  esRolValido,
  EmailExiste,
  existeUsuarioPorId
};
