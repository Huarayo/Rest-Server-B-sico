

const { Schema,model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true,'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true,'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contrasea es obligatoria']
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE'
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//sobrescribir el método para que no lo muestre pero que sí lo guarde en mongo
UsuarioSchema.methods.toJSON = function() {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}


module.exports = model('Usuario',UsuarioSchema);