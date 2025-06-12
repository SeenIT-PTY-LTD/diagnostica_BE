const mongoose = require('mongoose');
// const connection = mongoose.createConnection('mongodb://DiagAdmin:PainAdmin2024@54.252.90.36:27017/pain_management?directConnection=true').on('open',()=>{
const connection = mongoose.createConnection('mongodb+srv://Admin_Diag:DiagAdmin2025@diagnostica.bufpk3m.mongodb.net/pain_management').on('open',()=>{
    console.log("Mongo DB Connected");
}).on('error',()=>{
    console.log("Mongo DB Connection Error")
});

module.exports = connection;


// const mongoose = require('mongoose');

// const connection = mongoose.createConnection('mongodb+srv://Admin_Diag:DiagAdmin2025@diagnostica.bufpk3m.mongodb.net/test_pain_management')
//     .on('open', () => {
//         console.log("MongoDB Connected");
//     })
//     .on('error', (err) => {
//         console.log("MongoDB Connection Error:", err);
//     });

// module.exports = connection;

// const mongoose = require('mongoose');

// const connection = mongoose.createConnection('mongodb://localhost:27017/pain_management')
//     .on('open', () => {
//         console.log("MongoDB Connected");
//     })
//     .on('error', (err) => {
//         console.log("MongoDB Connection Error:", err);
//     });

// module.exports = connection;
