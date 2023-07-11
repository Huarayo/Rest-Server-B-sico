const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = new require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');


const login = async(req, res) => {

  const { correo, password } = req.body;

  try {
    
    //Verificar se el email existe
    const usuario = await Usuario.findOne({ correo });
    
    if( !usuario ) {
      return res.status(400).json({
        msg: 'Usuario / Correo incorrecto no se encuentra - correo'
      });
    }

    //Si el usuario está activo

    if( usuario.estado === false ) {
      return res.status(400).json({
        msg: 'Usuario / Usuario no está activo - estado: false'
      })
    }

    // Verificar la contraseña

    const validadPassword = bcrypt.compareSync( password, usuario.password );

    if( !validadPassword ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - Password'
      });
    }

    //Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Algo salió mal',
    })
  }



}

module.exports = {

  login
}