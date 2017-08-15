# node-websockets-example

##This is an example of how web sockets can be used with the approuter using node.js and socket.io.

###All deployments pre-requisites
*Note*: Make sure proxy settings are set correctly.</br>
*Note*: Make sure npm registry is set correctly.

Execute both in the `web` folder and `js` folder:
```
npm install
```
Or you can use `npm install` with the `--registry` option:
```
npm install --registry="[registry_url]"
```

### Local deployment
To start this example locally you must change `web/default-services.json` and `js/default-services.json` with a valid UAA configuration.
Then just execute both in the `web` folder and `js` folder:
```
npm start
```
Afterwards you can access the example in your browser on `localhost:5000`.

###Cloud Foundry deployment
To deploy on CF replace in the manifest.yml all occurrences of `[c/d/i-user]` with your user and all occurrences of `[cfdomain]`
with the Cloud Foundry domain name.

Execute:
```
cf cs xsuaa default uaa
cf push -f manifest.yml
```
The first command will create a UAA service and the second will push the application in CF.


###XSA on-premise runtime deployment
To deploy on XSA on-premise runtime replace in the manifest-op.yml
`[approuter-port]` with a free port number. This will be the example single point of entry.
Next you have to replace the two occurences of `[node-port]` with another free port - this will be the backend service.
Replace `[hostname]` with the hostname of the XSA runtime.

Execute:
```
xs cs xsuaa default uaa
xs push -f manifest-op.yml
```
The first command will create a UAA service and the second will push the application in XSA.

*Note*:  This example is based on socket.io example https://github.com/socketio/socket.io/tree/master/examples/chat

