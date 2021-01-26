'use strict'

var Project = require('../models/project');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo test del controlador de project'
		});
	},

	saveProject: function(req, res){
		var project = new Project();

		var params = req.body;

		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {
			if (err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if (!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});

		return res.status(200).send({
			project: project,
			message: 'Metodo saveProject'
		});
	},

	getProject: function(req, res){
		var projectId = req.params.id;

		if (projectId == null) return res.status(404).send({message: 'El proyecto no existe'});

		Project.findById(projectId, (err, project) => {
			if (err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if (!project) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function(req, res){

		Project.find({/*year: 2019*/}).sort('-year').exec((err, projects) => { // (Cualq. condición/es p/ filtrar)
			if (err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if (!projects) return res.status(404).send({message: 'No hay proyectos para mostrar.'});

			return res.status(200).send({
				projects
			});
		});
	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) => {
			if (err) return res.status(500).send({message: 'Error al actualizar.'});

			if (!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				project: projectUpdated
			});
			 
		});
	},

	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
			if (err) return res.status(500).send({message: 'No se ha podido borrar el proyecto.'});

			if (!projectDeleted) return res.status(404).send({message: 'No se puede eliminar ese proyecto.'});

			return res.status(200).send({
				project: projectDeleted
			});
		});
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if (req.files) {
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];


			Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
				if (err) return res.status(200).send({message: 'La imagen no se ha subido.'});

				if (!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen.'});

				return res.status(200).send({
					project: projectUpdated
				});


			});

		}else{
			return res.status(200).send({
				message: fileName
			});
		}
	}
};

module.exports = controller;