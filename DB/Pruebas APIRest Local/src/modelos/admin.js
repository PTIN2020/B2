// modelos/admin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('cryptojs');
const moment = require('moment');

const adminSchema = new Schema({
    id: {		// DNI
	type: String,
	required: true,
	unique: true
    }, 		
    name: {		
	type: String,
	required: true
    },
    email: {		
	type: String,
	required: true,
	unique: true
    },
    birthdate: {	// PDTE clavar formato		
	type: Date,
	required: true
	//default: moment(new Date(Date.now())).format('MMM Do YY')
    },
    phone: {		
	type: String,
	required: true,
	unique: true
    },
    password: {		
	type: String,
	required: true
    }
});

//const dateformat = moment(adminSchema).format('L');

// No mostrar la contraseña del administrador en ningún momento
adminSchema.pre('save', function(next) {
	let admin = this;
	if (!admin.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(admin.password, salt, null, (err, hash) => {
			if (err) return next(err)

			admin.password = hash;
			next();
		})
	})
});

module.exports = mongoose.model('Administrator', adminSchema);

