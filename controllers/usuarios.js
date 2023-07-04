const { response } = require('express');

const usuariosGet = (req = request, res = response) => {

  const { q, nombre = "no name", apikey, page = 1, limit } = req.query;

  res.json({
    ok: true,
    msg: 'get API - controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  })
}

const usuariosPut =(req, res) => {

  const id = req.params.id;

  res.status(400).json({
    ok: true,
    msg: 'put API - controller',
    id
  })
}

const usuariosPost = (req, res) => {

  const { nombre, edad } = req.body;

  res.json({
    ok: true,
    msg: 'post API - controller',
    nombre,edad
  });

}

const usuariosDelete = (req, res) => {
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
