'use strict';
// Setup basic express server
var xssec = require('sap-xssec');
var xsenv = require('sap-xsenv');
var express = require('express');
var cfenv = require('cfenv');
var passport = require('passport');
var JWTStrategy = require('sap-xssec').JWTStrategy;
var appEnv = cfenv.getAppEnv();
var app = express();

require('./route')(app);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = appEnv.port || 8084;
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

app.use(passport.initialize());
app.use('/',passport.authenticate('JWT', { session: false }));
var server = app.listen(port, function(){
  //process.env['PORT'] = port;
 //appEnv.port = 8084;
  //console.log('Port set by cloud foundary' + appEnv.port);
  console.log("I m listening at http://" + host + ":" + port);
  //console.log("Print the instance address " + process.env.CF_INSTANCE_PORTS);
});
