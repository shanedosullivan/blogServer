'use strict';
module.exports = function(app) {
  var blogController = require('../controllers/blogController');


  // todoList Routes
  app.route('/document')
    .get(blogController.list)
    .post(blogController.save);


  app.route('/document/:documentId')
    .get(blogController.getById)
    .put(blogController.update)
    .delete(blogController.delete);

};
