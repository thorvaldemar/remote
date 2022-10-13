"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var control_1 = require("./control");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var remote = new control_1.Control();
app.get('/', function (req, res) { return res.sendFile("".concat(__dirname, "/frontend/index.html")); });
app.get('/app.js', function (req, res) { return res.sendFile("".concat(__dirname, "/frontend/app.js")); });
app.get('/style.css', function (req, res) { return res.sendFile("".concat(__dirname, "/frontend/style.css")); });
app.post('/control/:key', function (req, res) {
    remote.press(req.params.key).catch(function (err) { return console.log(err); });
});
app.listen(80, function () { return console.log("Listening to *:80"); });
