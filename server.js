const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const config=require('./config.js');
const mongoose=require('mongoose');
require('./employee.route.js')(app);
mongoose.Promise=global.Promise;
mongoose.connect(config.url,{useNewUrlParser:true, useUnifiedTopology: true,useFindAndModify:false}).then(
    ()=>{console.log("Database connected successfully ");}
).catch(err=>{
    console.log('Could not connect to the database.');
    process.exit();
});
app.set('port', (5000));
// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Demo Employee app"});
});

// listen on port 5000
app.listen(config.serverport,"0.0.0.0", () => {
    console.log("Server is listening on port 5000");
});