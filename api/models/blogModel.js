'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DocumentSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the document'
  },
    author: {
    type: String,
    Required: 'Kindly enter the author of the document'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  text_body: {
      type: String,
      Required: 'Kindly enter the body of the document'
  }
});

module.exports = mongoose.model('Document', DocumentSchema);