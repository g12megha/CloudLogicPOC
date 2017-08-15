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


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = appEnv.port || 8084;

//************Passport strategy*****************************//
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

app.use(passport.initialize());
app.use('/',passport.authenticate('JWT', { session: false }));
//************Passport strategy*****************************//

/********Container Security API**********/

/*app.use(function(req,resp,next){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
       var token = req.headers.authorization.split(' ')[1];
     } else if (req.query && req.query.token) {
      var token = req.query.token;
     }
    xssec.createSecurityContext(token, xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa, function(error, securityContext) {
    if (error) {
        console.log('Security Context creation failed');
        return next(new Error('Security Context creation failed'));;
    }
    console.log('Security Context created successfully');
    var userInfo = securityContext.getUserInfo();
    var tokenInfo = securityContext.getToken();
    var checkLocalScope = securityContext.checkLocalScope();
    console.log("User Info retrieved successfully" + JSON.stringify(userInfo));
    app.set("userInfo", JSON.stringify(userInfo));
    app.set("checklocalScope", JSON.stringify(checkLocalScope));
    app.set("tokenInfo", JSON.stringify(tokenInfo));
    return next();
});
});
*/
/*************Container Security API *******/
var server = app.listen(port, function(){
  console.log("I m listening at http://" + host + ":" + port);
});

require('./route')(app);
