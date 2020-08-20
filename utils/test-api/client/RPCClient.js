const axios = require('axios');

// https://blockchain.info/unconfirmed-transactions?format=json

function RPCRequest(url, params) {
    return {
        host: url,
        userName: '',
        password: '',
        port: 0,
        
        params: {
            method: ''

            ...params
        }
    }
}

function sendRequest(url, params, callback) {
    axios(
        BlockchainInfoGet(url, params))
        .then( (response) => {
            // console.log(response);
            callback(response);
        })
        .catch( (error) => {
            console.log("GET Error: " + error);
        });
}


module.exports = {
    getTxPool: function() {
        sendRequest(
            'unconfirmed-transactions', 
            {format: 'json'}, 
            (response) => {console.log(response.data)}
        );
    },
    
    getBlock: function(hash) {
        sendRequest(
            'rawblock/' + hash, 
            {},
            (response) => {console.log(response.data)}
        ); 
    },

    getBlocksForDay: function(time) {
        sendRequest(
            'blocks', 
            {format: 'json'},
            // (response) => {console.log(response.data.blocks.length)}
            (response) => {console.log(response.data.blocks)}
        ); 
    },

    // getEndStationsForLine: function(line) {
    //     sendRequest(
    //         'Line/' + line, 
    //         {},
    //         (response) => {
    //             let lines = response.data.map(mode => mode.id)
    //             console.log(lines);
    //         }
    //     ); 
    // }
}