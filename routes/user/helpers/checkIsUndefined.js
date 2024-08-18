//check to see if req.body exist
function checkIsUndefined(req, res, next){
    if(Object.keys(req.body).length === 0){
        res.status(500).json({message: "Please fill out form."})
    }else{
        const errorObj = {}
        res.locals.errorObj = errorObj
        next()
    }
}

module.exports = checkIsUndefined
