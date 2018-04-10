var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());
//

app.post('/webhook', (req, res) => {
    let body = req.body;
    if (body.object === "page") {
        body.entry.forEach(function (entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('Event_Recieved');
    } else {
        res.status(404);
    }
});
app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "IUDS98ASD9896KJKSD4";
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
let hostPort = process.env.Port || 3000;
app.listen(process.env.Port || 3000, () => (console.log('listening in port ' + hostPort))    );