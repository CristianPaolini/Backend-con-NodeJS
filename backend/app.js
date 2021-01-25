'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// rutas

app.post('/test/:id', (req, res) => {
	console.log(req.body.nombre);
	console.log(req.query.web);
	console.log(req.params.id);
	res.status(200).send({
		message: "Hola mundo desde mi API de NodeJS"
	});
});

app.get('/', (req, res) => {
	res.status(200).send(
		"<h1>Pagina de inicio</h1>"
	);
});

// exportar
module.exports = app;