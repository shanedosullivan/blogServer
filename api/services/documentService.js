'use strict';

var textract = require('textract');

exports.extractText = function(type, bufferText){
	return new Promise(function (resolve, reject){
		console.log("Starting text extraction");
	  	textract.fromBufferWithMime(type, bufferText, function( error, text )  {
	      if (error) {
	      	reject(Error("Could not extract text from file"));
	      	console.log("Houston we have a problem: " + error);
	      }
	      resolve(text);
	    });
	});
};