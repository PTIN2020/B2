// servicios/index.js

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

function createToken (admin) {
	const payload = {
		sub: admin._id,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix(),	// 30 días de duración
	}
	return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken (token) {
	const decoded = new Promise((resolve, reject) => {
		try {
			// Token correcto
			const payload = jwt.decode(token, config.SECRET_TOKEN);
			// Token expirado
			if (payload.exp <= moment().unix()){
				resolve({
					status: 401,
					message: 'Token expirado'
				})
			}
		resolve(payload.sub);
		// Token no válido
		} catch(err) {
			reject({
				status: 500,
				message: 'Token invalido'
			})
		}
	})
	return decoded;
}

module.exports = {
	createToken,
	decodeToken
}
