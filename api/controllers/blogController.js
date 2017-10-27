'use strict';

var blogService = require('../services/blogService');
var documentService = require('../services/documentService');
var log4js = require('log4js');
var logger = log4js.getLogger('controller');
var fileUpload = require('express-fileupload');

exports.list = function(req, res) {

	var keyword = req.query.keyword;

	blogService.list(keyword).then(function(documents) {
  		res.json(documents);
	})
	.catch(function (error) {
        res.send(error.message);
    });

};

exports.getById = function(req, res) {
	blogService.getById(req.params.documentId).then(function(document) {
  		res.json(document);
	})
	.catch(function (error) {
        res.send(error.message);
    });
};

exports.save = function(req, res) {
	if (!req.files)
	    return res.status(400).send('No files were uploaded.');

	documentService.extractText(req.files.file.mimetype, req.files.file.data).then(function(bufferText){
		return blogService.save(bufferText);
	}).then(function() {
		res.json(req.files.file.name + " was uploaded successfully!");
	}).catch(function(error) {
		res.send(error.message);
	});
};

exports.update = function(req, res) {
	if (!req.files)
	    return res.status(400).send('No files were uploaded.');

	documentService.extractText(req.files.file.mimetype, req.files.file.data).then(function(bufferText){
		return blogService.update(bufferText, req.params.documentId);
	}).then(function() {
		res.json(req.files.file.name + " was updated successfully!");
	}).catch(function(error) {
		res.send(error.message);
	});
};

exports.delete = function(req, res) {
	blogService.delete(req.params.documentId).then(function(message) {
		res.json(message);
	})
	.catch(function (error) {
        res.send(error.message);
    });
};