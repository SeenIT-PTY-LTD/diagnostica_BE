const Router = require('express').Router();
const TestController = require('../controller/TestControllers');

// test
Router.get('/test', TestController.TestController)

module.exports = Router;