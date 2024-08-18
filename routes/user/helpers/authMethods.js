//check for email valid
//check alpha
//check alphanumeric
//check if strong password
const {isEmail, isAlpha, isAlphanumeric} = require('validator')

function checkIsEmailFunc(req, res, next){
    const {errorObj} = res.locals
    if(!isEmail(req.body.email)){
        errorObj.wrongEmailFormat = "Email must be valid."
    }
    next()
}

function checkIsAlphaFunc(req, res, next){
    const {errorObj} = res.locals
    for(let key in req.body){//look for the key
        if(key === "firstName" || key === "lastName"){//if we find the key
            if(!isAlpha(req.body[key])){//checks if the value is alpha
                errorObj[key] = `${key} can only have alphabetical characters.`//save error and returns the error in obj
            }
        }
    }
    next()
}

function checkIsAlphanumericFunc(req, res, next){
    const {errorObj} = res.locals
    if(!isAlphanumeric(req.body.username)){
        errorObj.wrongUsernameFormat = "Username can only have alphanumeric charecters."
    }
    next()
}

module.exports = {checkIsAlphaFunc, checkIsEmailFunc, checkIsAlphanumericFunc}