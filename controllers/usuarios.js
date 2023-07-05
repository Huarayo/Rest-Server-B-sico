const { response } = require('express');
const bcriptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuariosGet = async(req = request, res = response) => {

  // const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
  const { limite = 1, desde = 0 } = req.query;
  const query = { estado : true };

  // const usuarios = await Usuario.find( query )
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = Usuario.countDocuments( query );

  //se van a ejecuatar de manera simultánea , el codigo no sigue hasta que las 2 se completen
  //y si una da error todas van a dar error
  const [ total, usuarios ]= await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
    .skip(Number(desde))
    .limit(Number(limite))
  ]);


  res.json({
    total,
    usuarios
  });

}

const usuariosPut = async (req, res = response) => {

  const id = req.params.id;
  const {_id, password, google, correo, ...resto } = req.body;

  //TODO validar contra la bbdd

  if( password) {
    //encriptar contraseña
    const salt = bcriptjs.genSaltSync();
    resto.password = bcriptjs.hashSync( password, salt ); 
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto)


  res.status(400).json(usuario)
}


const usuariosPost = async(req, res = response) => {

  const { nombre, correo, password, rol} = req.body;
  const usuario = new Usuario( { nombre, correo, password, rol} );
  
  //Verificar si el correo existe


  //Encriptar la contraseña
  const salt = bcriptjs.genSaltSync();
  usuario.password = bcriptjs.hashSync( password, salt );

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario
  });

}

const usuariosDelete = async(req, res) => {

  const { id } = req.params;

  //fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    ok: true,
    msg: 'delete API - controller' 
  })
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}
