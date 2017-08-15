var http = require('http');
var events = require('events');
var eventsEmitter = new events.EventEmitter();

var connectHandler =  function connected(){
  console.log('I m connected now');
}

eventsEmitter.on('connection', connectHandler);

var server = http.createServer(function (request,response) {
  eventsEmitter.emit('connection');
  var url = request.url;
  response.writeHead(200,{'Content-type' : 'application/json'});
  var data =  "Requested path was " + url;
  response.write(data.toString());
  response.end('HelloMegha\n');
}).listen(8083);
