//make sure req.body exits
const {isEmpty} = require('validator')
function checkIsEmpty(req, res, next){
    const{errorObj} = res.locals
    for(let key in req.body){
       if (isEmpty(req.body[key])){
            errorObj[key] = `${key} cannot be empty.`
       }
    }

    if(Object.keys(errorObj).length> 0){
        res.status(500).json({message: "Failure", errorObj})
    }else{
        next()
    }
}

module.exports = checkIsEmpty