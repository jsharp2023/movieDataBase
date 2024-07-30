const express = require('express')
//other packages
const logger = require('morgan')
const cors = require('cors')
const userRouter = require('./routes/user/userRouter')

//start express app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/api/user', userRouter)


module.exports = app