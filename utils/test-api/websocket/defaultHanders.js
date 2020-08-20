module.exports = {
    handleClose: function (webSocket) {
        webSocket.on('close', (close) => {
            console.log("Websocket closed: " + close);
        });
    },

    handleErrors: function (webSocket) {
        webSocket.on('error', (error) => {
            console.log("Websocket connection error: " + error);
        });
    },

    // STRATEGY: use pings to handle dropped connections. The websocket spec dictates that all clients should respond to pings with a pong, so we don't need to implement anything in our client for this to work.
    detectDrops: function (webSocketServer) {
        function heartbeat() {
            this.isAlive = true;
        }

        webSocketServer.on('connection', (webSocket) => {
            webSocket.isAlive = true;
            webSocket.on('pong', heartbeat);
        });

        const interval = setInterval(function ping() {
            console.log("Pinging all clients to detect dropped connections");
            webSocketServer.clients.forEach((webSocket) => {
                if (webSocket.isAlive === false) {
                    console.log("Connection with " + webSocket + "lost, terminating.");
                    return webSocket.terminate();
                }

                webSocket.isAlive = false;
                webSocket.ping(() => { });
            });
        }, 30000);
    },

    logReceived: function (webSocket) {
        webSocket.on('message', (message) => {
            console.log('received: %s', message);
        });
    }

}
