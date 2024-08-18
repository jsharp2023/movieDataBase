require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const port = 3000

mongoose
    .connect("mongodb://localhost:27017/movie-db")
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server Started on port ${port}`)
            console.log('MongoDB Connected')
        })
    })
    .catch((error)=>{
        console.log(error)
    })

