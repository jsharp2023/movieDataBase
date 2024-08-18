const express = require("express");
const router = express.Router();
const {createUser, login, getUsers, getUser} = require('./controller/userController');
const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmpty = require("./helpers/checkIsEmpty");
const { checkJwtToken } = require('./utils/jwtMiddleware')
const { 
    checkIsAlphanumericFunc, 
    checkIsAlphaFunc, 
    checkIsEmailFunc 
} = require("./helpers/authMethods");


router.post("/sign-up", 
    checkIsUndefined,
    checkIsEmpty, 
    checkIsAlphanumericFunc, 
    checkIsAlphaFunc, 
    checkIsEmailFunc,
    createUser
)

router.post("/login",
    checkIsUndefined,
    checkIsEmailFunc,
     checkIsEmpty,
     login
    )

    router.get('/get-all-users', checkJwtToken, getUsers)
   router.get('/get-user', checkJwtToken, getUser)

module.exports = router