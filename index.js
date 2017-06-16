"use strict";
/**
 * Created by disme on 13/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
//# sourceMappingURL=index.js.map