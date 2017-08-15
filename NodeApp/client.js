var http = require('http');
var app = require('express');
var options = {
  host : 'localhost',
  port : '8083',
  path : '/findMeghaCheck'
};

var callback = function(response){
  var body = '';
  response.on('data', function(data){
    body = body + data;
  });
   response.on('end',function(){
     console.log("Response from the server");
     console.log(body);
   });
}
var req = http.request(options,callback);
req.end();
