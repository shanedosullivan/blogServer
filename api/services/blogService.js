'use strict';

var mongoose = require('mongoose'),
  DocumentMongoose = mongoose.model('Document');

exports.list = function(keyword) {

	if(keyword){
		return search(keyword)
	}
	else {
		return new Promise(function (resolve, reject){
		  DocumentMongoose.find({}, function(err, documents) {
		      if (err) 
		        reject(Error("Could not retrieve list of blogs"));
		      
		      resolve(documents);
		    });
		});
	}
};

exports.getById = function(id) {
	return new Promise(function (resolve, reject){
		  DocumentMongoose.findById(id, function(err, document) {
	      if (err) 
	        reject(Error("Could not retrieve blog with id: "+id));
	     
	      resolve(document);
	    });
	});
};

exports.save = function(document) {
	return new Promise(function (resolve, reject){
		  var documentMongoose = new DocumentMongoose({text_body: document});
		  documentMongoose.save(function(err, savedDocument) {
		    if (err)
		        reject(Error("Could not save blog"));
		      
		    resolve(savedDocument);
	  });
	});
};

exports.update = function(document, id) {
	return new Promise(function (resolve, reject){
		console.log("Doc: "+document);
		  DocumentMongoose.findOneAndUpdate({_id: id}, {text_body: document}, {new: true}, function(err, updatedDocument) {
		    if (err){
		    	console.log(err);
		        reject(Error("Could not update blog with id: "+ id));
		    }
		    resolve(updatedDocument);
  		});
	});
};

exports.delete = function(id){
	return new Promise(function (resolve, reject){
		DocumentMongoose.remove({_id: id}, function(err, user) {
		    if (err)
		      reject(Error("Could not delete blog with id: "+id));

		    resolve({ message: 'Blog with id ' +id+ ' successfully deleted' });
		  });
	});
};

var search = function(keyword){
	return new Promise(function(resolve, reject){
		DocumentMongoose.find({text_body:{ $regex: keyword, $options: "i"}}, function(err, results) {
			if (err)
		      reject(Error("Could not search blogs for keyword: "+ keyword));

		    resolve(results);
		});
	});
};