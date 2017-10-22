'use strict';

var mongoose = require('mongoose'),
  DocumentMongoose = mongoose.model('Document');

exports.list = function() {
	return new Promise(function (resolve, reject){
	  DocumentMongoose.find({}, function(err, documents) {
	      if (err) 
	        reject(Error("Could not retrieve list of blogs"));
	      
	      resolve(documents);
	    });
	});
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
		console.log("Text extraction done, trying to save..." + document);

		  var documentMongoose = new DocumentMongoose({text_body: document});
		  documentMongoose.save(function(err, savedDocument) {
		    if (err)
		        reject(Error("Could not save blog"));
		      
		    resolve(savedDocument);
	  });
	});
};

// exports.update = function(document, id) {
// 	return new Promise(function (resolve, reject)){
// 		  UserMongoose.findOneAndUpdate({_id: id}, document, {new: true}, function(err, updatedDocument) {
// 		    if (err)
// 		      reject(Error("Could not update blog with id: "+ id));
		    
// 		    resolve(updatedDocument);
//   		});
// 	});
// };

// exports.delete = function(id){
// 	return new Promise(function (resolve, reject)){
// 		UserMongoose.remove({_id: id}, function(err, user) {
// 		    if (err)
// 		      reject(Error("Could not delete blog with id: "+id));

// 		    resolve({ message: 'Blog with id ' +id+ ' successfully deleted' });
// 		  });
// 	});
// };