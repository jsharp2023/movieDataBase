const bcrypt = require('bcryptjs')
const User = require('../User')
const { isEmpty, isEmail, isAlpha, isAlphanumeric } = require('validator')


async function createUser(req, res){
    try {
        const errorObj = {}
        const {username, firstName, lastName, email, password} = req.body
       
        if(!isAlpha(firstName) || !isAlpha(lastName)){
            errorObj.name = "firstName and lastName must be alphabetical."
        }
        if(!isAlphanumeric(username)){
            errorObj.username = "user must be a alphanumeric"
        }
        if(!isEmail(email)){
            errorObj.email = "email not valid"
        }
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

    if(Object.keys(req.body).length === 0){
        return res.status(500).json({message: "Please fill out the form."})
    }

    const errorObj = {}

    if(isEmpty(email)){
        errorObj.email = "Email cannot be empty."
    }
    if(isEmpty(password)){
        errorObj.password = "Password cannot be empty."
    }
    if(!isEmail(email)){
        errorObj.email = "Email must be in valid email formate."
    }

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
        res.json({message: "User logged in."})
       }else{
        res.status(400).json({message: "Failure", payload: "Please check email and password."})
       }
    }
  } catch (error) {
    res.status(500).json({message: "Error", error})
  }
}


module.exports = {createUser, login}