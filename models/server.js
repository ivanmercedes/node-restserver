const express = require('express');
var cors = require('cors')

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRoutePath = '/api/users';

        // Middlewares
        this.middlewares();
        // Rutas
        this.routes()
    }

    middlewares() {

        // Cors
        this.app.use(cors());

        // Leer y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
       this.app.use(this.usuarioRoutePath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto',  this.port);
        })
    }
}


module.exports = Server;