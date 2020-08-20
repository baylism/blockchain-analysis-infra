const WebSocket = require('ws');

module.exports = {
    broadcastAll: function(webSocketServer, message) {
  
        if (webSocketServer.clients.size == 0) {
          console.log("no clients"); return;
        }
      
        webSocketServer.clients.forEach((client) => {
          // console.log("broadcasting " + JSON.stringify(message) + "to client.");
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      }
}