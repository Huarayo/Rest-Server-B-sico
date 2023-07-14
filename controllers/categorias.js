// const { response } = require('express');
// const { Categoria } = require('../models');

// const obtenerCategorias = async( req, res = response ) => {

//   const { limite = 5, desde = 0 } = req.query;
//   const query = { estado: true };

//   //esperar a que todas las promesas se resuelvan antes de seguir
//   const [ total, categorias ] = await Promise.all([
//     Categoria.countDocuments(query),
//     Categoria.find(query)
//       .populate('usuario', 'nombre')
//       .skip( Number( desde ))//salte
//       .limit( Number( limite ))//limitar
//   ]);

//   res.json({
//     total,
//     categorias
//   })

// }


// const obtenerCategoria = async( req , res = response ) => {

//   const { id } = req.params;
//   const categoria = Categoria.findById( id )
//     .populate('usuario', 'nombre');
  
//   console.log("hola mundo")
//   res.json({ categoria })
// }

// const crearCategoria = async( req, res = response ) => {

//   const nombre = req.body.nombre.toUpperCase();

//   const categoriaDB = await Categoria.findOne({ nombre });

//   if ( categoriaDB ) {
//     return res.status(400).json({
//       msg: `La categoria ${ categoriaDB.nombre }, ya existe`
//     })
//   }

//   //Generar la data a guardar
//   const data = {
//     nombre,
//     usuario: req.usuario._id
//   }

//   console.log('leonidas:' + req.usuario)
//   const categoria = new Categoria ( data );

//   //Guardar en DB
//   await categoria.save();

//   res.status(200).json(categoria)
// }

// module.exports = {
//   obtenerCategorias,
//   obtenerCategoria,
//   crearCategoria
// }