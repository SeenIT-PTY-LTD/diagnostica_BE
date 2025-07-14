const Router = require('express').Router();
const TestController = require('../controller/TestControllers')

// test
Router.post('/test', TestController.TestController)

module.exports = Router;