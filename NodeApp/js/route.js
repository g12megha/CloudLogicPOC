module.exports = function(app){
  var locs = require('./location');
  app.get('/location', locs.findAll);
  app.get('/location/:id', locs.findByID);
  app.get('/',locs.getRoot);
}
