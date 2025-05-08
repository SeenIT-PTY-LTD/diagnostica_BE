const express = require('express');
const body_parser = require('body-parser');
const router = require('./routers/router');
const cors = require('cors')

const app = express();

app.use('/images', express.static('img'));

app.use(cors({
    "Access-Control-Allow-Origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
}));
app.use(body_parser.json());
app.use('/',router);
app.use(express.json());

module.exports = app;