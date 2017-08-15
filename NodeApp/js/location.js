exports.findAll = function(req,resp){
  var locs = [{"Country" : "USA", "State" : "CA" , "id" : "megha"}, {"Country" : "India", "State" : "Bihar", "id" : "Gandhi"}];
  resp.send(locs);
}

exports.findByID = function(req,resp){
 // var allLocs = findAll(req,resp);
  resp.send('Hey i m ' + req.params.id);
}

exports.getRoot =  function(req,resp){
  resp.send("Welcome to Megha Test App1");
}
