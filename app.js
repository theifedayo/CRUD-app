const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session')



//config/config.env has been ignored by git due to secret environment
//variables
dotenv.config({path: './config/config.env'});

//connect to mongoDB database
connectDB();


const app = express();

//body parser
app.use(express.json());


//enable cors
app.use(cors());



//Routes setup
//s => story, other models like User can be set up as /api/v1/u
app.use('/api/v1/s', require('./routes/story'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(unauthorizedError(401));
});




//Handle unauthorized error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
    	"success": false,
    	"message" : err.name + ": " + err.message
    });
  }
});




//Server setup in development or production mode
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
})

module.exports = app;


