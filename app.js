const express = require('express')
//other packages
const logger = require('morgan')
const cors = require('cors')
const userRouter = require('./routes/user/userRouter')
const createError = require('http-errors')

//start express app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/api/user', userRouter)

app.use(function(req, res, next){
    next(createError(404))
})

//error handler
app.use(function(err, req, res, next){
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}
    res.status(err.status || 500).json({message:"error", err})
})


module.exports = app