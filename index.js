const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// internal modules
const AuthMiddleware = require("./src/middleWears/AuthMiddleware.js");
const config = require('./src/config/config.js');

// routes import
const TestRoute = require('./src/routes/TestRoute.js');
const PatientRoute  = require('./src/routes/PatientRoute.js')
const RefferalRoute = require('./src/routes/RefferalRoute.js')
const SectionRoute = require('./src/routes/SectionRoute.js')
const SubSectionRoute = require('./src/routes/SubSectionRoute.js')
const BodyPartRoute = require('./src/routes/BodyPartsRoute.js')
const QuestionRoute = require('./src/routes/QuestionRoute.js')
const PatientsPromtsRoute = require('./src/routes/PatientPromtsRoute.js')
const DiagnosticsRoute = require('./src/routes/DiagnosticsRoute.js')

const path = require('path');
const UserRouter = require("./src/routes/UserRoute.js");
app.use("/images", express.static(path.join(__dirname, '/src/img')));

//middlewears
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// mongo connection
mongoose.connect( config.mongo.connectionUrl );
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB',config.mongo.connectionUrl );
});
  
// middleware
// app.use(AuthMiddleware)

// regiter routes
app.use(TestRoute);
app.use('/patient', PatientRoute)
app.use('/user',UserRouter)
app.use('/refferal',RefferalRoute)
app.use('/section',SectionRoute)
app.use('/sub-section',SubSectionRoute)
app.use('/body-part', BodyPartRoute)
app.use('/question', QuestionRoute)
app.use('/promts',PatientsPromtsRoute)
app.use('/diagnostics',DiagnosticsRoute)

const PORT = config.express.port;
// listen
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server Started Url :- http://localhost:${PORT}`);
});
