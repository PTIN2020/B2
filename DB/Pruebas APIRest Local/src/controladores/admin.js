// controladores/admin.js
const mongoose = require('mongoose');
const Administrator = require('../modelos/admin');          
const servicio = require('../servicios');

function register (req,res) {
	const admin = new Admin({
		id: req.body.id,
		name: req.body.name,
		email: req.body.email,
		birthdate: req.body.birthdate,
		phone: req.body.phone,
		password: req.body.password
	})

	admin.save((err) => {
		if (err) res.status(500).json( `Error al crear el administrador: ${err}` );
		
		return res.status(200).send({
			message: 'Registro correcto',
			token: servicio.createToken(admin)
		});
	})
}


function login (req,res) {
	Administrator.find({ id: req.body.email, password: req.body.password }, (err, admin) => {
		if (err) return res.status(500).send({ message: err });
		if (!admin) return res.status(404).json(`El administrador ${admin} no existe`);

		req.admin = admin;
		res.status(200).send({
			message: 'Login correcto',
			token: servicio.createToken(admin)
		})
	})
}

module.exports = {
	register,
	login,
        indexAdmin: async (req,res,next) => {                 // (GET)Módulo index: Controla las rutas iniciales de administradores de la API
            const admin = await Administrator.find({});
            res.status(200).json(admin);
        },
        nuevoAdmin: async (req,res,next) => {                 // (POST) Módulo NuevoAdmin: Añade un administrador a la base de datos
            const nuevoAdmin = new Administrator(req.body);
            const {id, name, email, birthdate, phone, password} = req.body;
            if (id && name && email && birthdate && phone && password){
                const admin = await nuevoAdmin.save();
                res.json(admin);
            }
            else {
                res.status(500).json({error: 'Error: Administrador mal introducido, revise los campos'});
            }
        },
        obtenerAdmin: async (req,res,next) => {               // (GET) Módulo ObtenerAdmin: Muestra un administrador de la base de datos filtrando por su ID
            const { adminId } = req.params;
            const admin = await Administrator.findById(adminId);
            res.status(200).json(admin);
        },
        reemplazarAdmin: async (req,res,next) => {            // (POST) Módulo ReemplazarAdmin: Actualiza los datos de un admin de la base de datos
            const { adminId } = req.params;
            const nuevoAdmin = req.body;
            const antiguoAdmin = await Administrator.findByIdAndUpdate(adminId, nuevoAdmin);
	    res.status(200).json('Administrador modificado en la base de datos');
        },
        eliminarAdmin: async (req,res,next) => {              // (DELETE) Módulo EliminarAdmin: Elimina un administrador de la base de datos
            const { adminId } = req.params;
            await Administrator.findByIdAndRemove(adminId);
            res.status(200).json('Administrador eliminado de la base de datos');
        },

}
