var express = require('express');
var cfenv = require('cfenv').getAppEnv();
var http = require('request');
var app = express();
var envs = JSON.parse(process.env.VCAP_SERVICES);
var locHost = envs["user-provided"][0]['credentials']['host'] || null;
var port = cfenv.port || 8083;
var server = app.listen(port,function(){
  console.log("Listening at port " + port);
});

app.get('/',function(req,resp){
  console.log("make http request to " + locHost);
  http(locHost, function(error,response,body){
   resp.send(body);
  });
});
app.get('/location',function(req,resp){
  console.log("make http request to " + locHost + "/location");
  http(
   { uri : locHost + "/location",
    method : "GET"} , function(error,response,body){
      console.log("Response is " + response + " --" + body);
   resp.send(JSON.parse(body));
  });
});
