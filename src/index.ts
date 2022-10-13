import express from 'express';
import http from 'http';
import { Control } from './control';

const app = express();
const server = http.createServer(app);
const remote = new Control();

app.get('/', (req, res) => res.sendFile(`${__dirname}/frontend/index.html`));
app.get('/app.js', (req, res) => res.sendFile(`${__dirname}/frontend/app.js`));
app.get('/style.css', (req, res) => res.sendFile(`${__dirname}/frontend/style.css`));

app.post('/control/:key', (req, res) => {
    remote.press(req.params.key).catch(err => console.log(err));
    res.send();
});

app.post('/tab/start', (req, res) => {
    remote.keyDown('alt').then(() => {
        remote.press('tab').then(() => {
            res.send();
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

app.post('/tab/stop', (req, res) => {
    remote.keyUp('alt').then(() => {
        res.send();
    }).catch(err => console.log(err));
});

app.post('/system/shutdown', (req, res) => {
    remote.write('shutdown').catch(err => console.log(err));
});

app.listen(80, () => console.log(`Listening to *:80`));