const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {

    const body = req.body;
    if (body.object == 'page') {

        body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent)
        });

        res.status(200).send('Evento recibido')
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) => {

    const VERIFY_TOKEN = 'stringunico';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode == 'subscribe' && token == VERIFY_TOKEN) {
            console.log('WebHool verificado');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(3000, () => {
    console.log("Servidor Arriba");
})
