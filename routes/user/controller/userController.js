const bcrypt = require('bcryptjs')
const User = require('../model/../User')
const { isEmpty, isEmail, isAlpha, isAlphanumeric } = require('validator')
const { router } = require('../../../app')

async function createUser(req, res){
    try {
        const {username, firstName, lastName, email, password} = req.body
       
        if(!isAlpha(firstName) || !isAlpha(lastName)){
            return res.json({message:"firstName must be alphabetical."})
        }
        if(!isAlphanumeric(username)){
            return res.json({message:"user must be a alphanumeric"})
        }
        if(!isEmail(email)){
            return res.json({message:"email not valid"})
        }
        return res.json({message: 'user created'})
        // const newUser = new User({
        //     username, firstName, lastName, email, password
        // })
    } catch (error) {
        res.status(500).json({message:'error'})
    }
}


module.exports = {createUser}