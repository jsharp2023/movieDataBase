const jwt = require('jsonwebtoken')
function checkJwtToken(req, res, next){
    try {
        if(req.headers && req.headers.authorization){
            const jwtToken = req.headers.authorization.replace("Bearer ", "")
            // const jwtToken = req.headers.authorization.slice(7)
            const decodedJwt = get.verify(jwtToken,process.env.PRIVATE_JWT_KEY )
            res.locals.decodedToken = decodedJwt
            next()
           
        }else{
            throw{message: "You don't have permission!", statusCode: 500}
        }
    } catch (error) {
        res.status(error.statusCode).json({message: error.message, error: error})
    }
}

module.exports = {checkJwtToken}