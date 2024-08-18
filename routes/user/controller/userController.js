const bcrypt = require('bcryptjs')
const User = require('../model/../User')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

async function createUser(req, res){
    try {
        const {errorObj} = res.locals
        if(Object.keys(errorObj).length > 0){
            // if there is an error
            res.status(500).json({message:"Failure", errorObj})
            
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                ...req.body, password: hashedPassword
            })
            const savedUser = await newUser.save()
            res.json({message:"User Saved.", payload: savedUser})
        }
    } catch (error) {
        // res.status(500).json({message:'error'})
        res.json({message:'error', error:error})
    }
}

//login
async function login(req, res){
    const {email, password} = req.body
    const {errorObj} = res.locals
    

    if(Object.keys(errorObj).length > 0){
        return res.status(500).json({message: "Failure.", errorObj})  
  }

  try {
    const foundUser = await User.findOne({email : email})
    if(!foundUser){
        return res.status(400).json({message: "Failure", payload: "Please check email and password."})
    }else{
       const passwordMatch = await bcrypt.compare(password, foundUser.password)
       if(passwordMatch){
        //If user successfully logs in
        //create jwt and give back to user payload
        const jwtToken = jwt.sign(
            {
                email: foundUser.email,
                username: foundUser.username,
                id: foundUser._id
            },
            process.env.PRIVATE_JWT_KEY,
            {expiresIn: "1d"}
        )
        res.json({message: "User Logged in.", payload: jwtToken})
       }else{
        res.status(400).json({message: "Failure", payload: "Please check email and password."})
       }
    }
  } catch (error) {
    res.status(500).json({message: "Error", error})
  }
}

async function getUsers(req, res){
    try {
        const foundUsers = await User.find({})
        res.json({message: "Users Found.", payload: foundUsers})
    } catch (error) {
        res.status(500).json({message: "Error", error}) 
    }

}

async function getUser(req, res){
    try {
        const foundUsers = await User.findOne({id: res.locals.decodedToken.id})
        res.json({message: "Users Found.", payload: foundUsers})
    } catch (error) {
        res.status(500).json({message: "Error", error}) 
    }

}

module.exports = {createUser, login, getUsers, getUser}