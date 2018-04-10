var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());
//
// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

}
// 
app.post('/webhook', (req, res) => {
    let body = req.body;
    if (body.object === "page") {
        body.entry.forEach(function (entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
        });
        res.status(200).send('Event_Recieved');
    } else {
        res.status(404);
    }
});
app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "EAALIDE94rKMBAKfjW9mxq2pFuYP49Q9auBsVxkkw1qCeo0ZCBoZAajIuJVaaxKznvptSnGsJK4GBmtyZBqJDeu2Df5lInclI1cJZALVeXWGR43BgBAXx4kdPzxQ0c0GW46iZAmpXcvNAoHpO20mL3WKajnJ0UZCUHrFFIDrN5BxAZDZD";
    // 
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
})
// 
let hostPort = process.env.PORT || 3000;
app.listen(hostPort, () => (console.log('listening in port ' + hostPort)));