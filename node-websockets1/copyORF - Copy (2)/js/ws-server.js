'use strict';

// Setup basic express server
var xssec = require('sap-xssec');
var xsenv = require('sap-xsenv');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function (req, res) {
  res.send('websocket endpoint');
});

// Auth
io.use(function (socket, next) {
  var token = socket.handshake.headers.authorization;
  if (!token) {
    return next(new Error('Must have JWT token'));
  }
  token = token.slice(7); // Remove 'Bearer '
  var uaa;
  try {
    uaa = xsenv.getServices({ uaa: 'uaa' }).uaa;
  } catch (e) {
    console.error('Could not get UAA service:', e.message);
    return next(e);
  }
  xssec.createSecurityContext(token, uaa, function (error, securityContext) {
    if (error) {
      return next(new Error('Security Context creation failed'));;
    }
    var user = securityContext.getUserInfo().logonName;
    socket.username = user;
    return next();
  });

});

// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function () {
    // add the client's username to the global list
    var username = socket.username;
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});