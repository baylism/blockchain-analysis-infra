const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const defaultHandlers = require('./websocket/defaultHanders');
const broadcast = require('./websocket/broadcast');

if (process.env.NODE_ENV !== 'production') {
    console.log("Using dotenv for environment variables");
    require('dotenv').load();
}


// ================== Express Setup ==================
// create an express 'app' - just a function that handles HTTP requests and responses
const app = express();

// http server - uses app as callback
const server = http.createServer(app);

function validHash() { return true }

app.param('hash', function (req, res, next, hash) {
    // validate hash

    if (validHash(hash)) {
        next();
    } else {
        next(new Error('Invalid hash'));
    }
});

const validBlockResponse = "{\n" +
    "\t\"result\": {\n" +
    "\t\t\"hash\": \"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048\",\n" +
    "\t\t\"confirmations\": 527114,\n" +
    "\t\t\"strippedsize\": 215,\n" +
    "\t\t\"size\": 215,\n" +
    "\t\t\"weight\": 860,\n" +
    "\t\t\"height\": 1,\n" +
    "\t\t\"version\": 1,\n" +
    "\t\t\"versionHex\": \"00000001\",\n" +
    "\t\t\"merkleroot\": \"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098\",\n" +
    "\t\t\"tx\": [\n" +
    "\t\t\t\"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098\"\n" +
    "\t\t],\n" +
    "\t\t\"time\": 1231469665,\n" +
    "\t\t\"mediantime\": 1231469665,\n" +
    "\t\t\"nonce\": 2573394689,\n" +
    "\t\t\"bits\": \"1d00ffff\",\n" +
    "\t\t\"difficulty\": 1,\n" +
    "\t\t\"chainwork\": \"0000000000000000000000000000000000000000000000000000000200020002\",\n" +
    "\t\t\"previousblockhash\": \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\",\n" +
    "\t\t\"nextblockhash\": \"000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd\"\n" +
    "\t},\n" +
    "\t\"error\": null,\n" +
    "\t\"id\": null\n" +
    "}";

let realString = "{\"result\":{\"hash\":\"00000ffd590b1485b3caadc19b22e6379c733355108f107a430458cdf3407ab6\",\"confirmations\":1,\"size\":306,\"height\":0,\"version\":1,\"versionHex\":\"00000001\",\"merkleroot\":\"e0028eb9648db56b1ac77cf090b99048a8007e2bb64b68f092c03c7f56a662c7\",\"tx\":[\"e0028eb9648db56b1ac77cf090b99048a8007e2bb64b68f092c03c7f56a662c7\"],\"time\":1390095618,\"mediantime\":1390095618,\"nonce\":28917698,\"bits\":\"1e0ffff0\",\"difficulty\":0.000244140625,\"chainwork\":\"0000000000000000000000000000000000000000000000000000000000100010\"},\"error\":null,\"id\":\"optional_string\"}";
// ================== REST ==================
app.all('*', (req, res) => {
    console.log(req);
    // res.setHeader('Content-Type', 'application/json');
    res.send(realString);
    // res.send(JSON.stringify({ a: 1 }));
});


// get: api
// api/block/:hash
// api/transactionpool






// ================== Websockets ==================
/**
 * 
 */

// create a websocket server instance that uses our HTTP server
// const webSocketServer = new WebSocket.Server({ server: server, path: '/websocket' });

// // defaultHandlers.detectDrops(webSocketServer);

// webSocketServer.on('connection', (webSocket) => {
//     defaultHandlers.handleErrors(webSocket);
//     defaultHandlers.handleClose(webSocket);
//     defaultHandlers.logReceived(webSocket);
// });

// let ob = {
//     type: 'poolTransaction',
//     totalOutput: 5000,
//     sizeBytes: 6000,
//     timeStamp: 7000,
//     hash: 'abcd',
// }

// setInterval(() => { broadcast.broadcastAll(webSocketServer, ob) }, 1000);


// ================== List for connections ==================
server.listen(process.env.PORT, () => {
    console.log('Websocket server listening on port ' + process.env.PORT)
});
