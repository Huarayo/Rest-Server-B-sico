const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario =  require('../models/usuario');
const { generarJWT, googleVerify } = require('../helpers');


const login = async(req, res = response) => {

  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo: "leo@leo.com" });

    console.log(usuario);

    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no se encuentra - correo'
      });
    }
  
    // Si el usuario está inactivo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario no está activo - estado: false'
      });
    }
  
    // Verificar la contraseña
    const validadPassword = bcrypt.compareSync( password, usuario.password );
  
    if (!validadPassword) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctas - password'
      });
    }
  
    // Generar el JWT
    const token = await generarJWT( usuario.id );
  
    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Algo salió mal'
    });
  }
}

const googleSignIn = async( req, res = response ) => {

  const { id_token } = req.body;

  try {

    const { correo, nombre, img } = await googleVerify( id_token );
    
    let usuario = await Usuario.findOne({ correo });

    if ( !usuario ) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true,
        // rol:"USER_ROLE"
      };

      // const salt = bcriptjs.genSaltSync();
      // data.password = bcriptjs.hashSync( data.password, salt );

      usuario = new Usuario( data );

      await usuario.save();
    }

    // Si el usuario en DB
    if ( !usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador del usuario'
      })
    }

    // Generar el JWT
    const token = await generarJWT( usuario.id )

    res.json({
      usuario,
      token
    })

  }catch(err) {
    res.status(400).json({
      ok:false,
      msg: 'El token no se pudo verificar',
      err
    })
  }


}

module.exports = {
  login,
  googleSignIn
}