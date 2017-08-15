var CircularJSON = require('circular-json');
exports.findAll = function(req,resp){
  console.log("Request is ");
//  console.log(req.app.get("userInfo"));
  //code for use with passport
  if ( req.user &&  req.authInfo)
      var locs = [{"Country" : "USA", "State" : "CA" , "id" : "megha"}, {"Country" : "India", "State" : "Bihar", "id" : "Gandhi"}, {"UserInfo" : CircularJSON.stringify(req.user)},{"AuthInfo" :CircularJSON.stringify(req.authInfo) }];
   // use with container security API
 //  if ( req.app.get("userInfo") && req.app.get("tokenInfo") )
  //    var locs = [{"Country" : "USA", "State" : "CA" , "id" : "megha"}, {"Country" : "India", "State" : "Bihar", "id" : "Gandhi"}, {"UserInfo" : req.app.get("userInfo")},{"tokenInfo": req.app.get("tokenInfo")  }];
else {
    var locs = [{"Country" : "USA", "State" : "CA" , "id" : "megha"}, {"Country" : "India", "State" : "Bihar", "id" : "Gandhi"}, {"UserInfo" :"empty"},{"AuthInfo" :"empty" }];
}
  resp.send(locs);
}

exports.findByID = function(req,resp){
 // var allLocs = findAll(req,resp);
// resp.send('Hey i m ' + req.params.id + "Local Scope " + req.app.get("checklocalScope")  +  "Logon name " + JSON.parse(req.app.get("userInfo")).logonName);
resp.send('Hey i m ' + req.params.id + "Local Scope " );
}

exports.getRoot =  function(req,resp){
  resp.send("Welcome to Megha Test App1");
}
