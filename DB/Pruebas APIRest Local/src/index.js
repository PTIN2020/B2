// Módulos requeridos
const bodyParser = require('body-parser');			// Módulo que convierte los datos que llegan en JSON
const express = require('express');				// Framework de NODE, crea nuestra estructura del servidor
const morgan = require('morgan');				// Módulo que nos permite ver por consola los cambios en el servidor
const mongoose = require('mongoose');				// Módulo de MongoDB que nos provee de métodos y funcionalidades

const jwt = require('jwt-simple');				// Módulo JWT, autenticación por tokens
const config = require('./config/config');			// Fichero de configuración 
const path = require('path');
const app = express();

const routes = require('./rutas/all');				// Único fichero de rutas en uso.				

// Conexión a la BD
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://usuario:contraseña@host:puerto/nombre_BD');	 Esta será la conexión real
mongoose.connect('mongodb://localhost/terminal2', {				// Conexión a BD de prueba en local
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(db => console.log('Base de datos conectada'))
	.catch(err => console.log(err));


// Configuración del servidor 
app.set('puerto', process.env.PORT || 3000);    		// Se escogerá un puerto definido o por defecto el puerto 3000

// Middleware use
app.use(morgan('dev'));     					// Permite ver por consola las peticiones HTTP que llegan al servidor
app.use(bodyParser.urlencoded({ extended: true }));		// Convierte las peticiones del cliente ...
app.use(bodyParser.json());					// ... y las pasa a formato JSON

// Arranque del servidor
app.listen(app.set('puerto'), () => {
	console.log(`API Rest corriendo en el puerto ${app.get('puerto')}`);
});

// Rutas  		
app.use('/api/', routes);
