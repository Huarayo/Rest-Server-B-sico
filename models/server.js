const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

const app = express()

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();//llamar a mis rutas
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {

    //CORS
    this.app.use( cors() )

    //Lectura y parseo del body
    this.app.use( express.json() );
    
    this.app.use( express.static('public') ); //lo que me interesa publicar es public

  }

  routes() {
    this.app.use( this.usuariosPath , require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto: ",this.port)
    })
  }
}


module.exports = Server;