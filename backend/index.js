'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
		.then(() =>{
			console.log("Conexión a la db establecida satisfactoriamente");
		})
		.catch(err => console.log(err));