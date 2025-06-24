const app = require('./app')

const port = 3003;

app.get('/',(req,res)=>{
    res.send("Welcome");
}); 



app.listen(port,()=>{
    console.log(`Server Listening on port:${port}`)
});

// const app = require('./app');

// const port = 3003;

// app.get('/', (req, res) => {
//     res.send("Welcome");
// });

// // Listen on all network interfaces
// app.listen(port, '0.0.0.0', () => {
//     console.log(`Server listening on http://0.0.0.0:${port}`);
// });
