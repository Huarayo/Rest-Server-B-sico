const express = require('express');
const cors = require('cors');

const app = express()

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORt;
    this.usuariosPath = '/api/usuarios';

    //middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();//llamar a mis rutas
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
      console.log("Servidor corriendo en el puerto: ",process.env.PORT)
    })
  }
}


module.exports = Server;