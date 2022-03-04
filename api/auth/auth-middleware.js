
const restricted = (req, res, next) => {!
    console.log("restricted middleware")
    next()
}
const checkRole = role =>  (req, res, next) => {
    console.log("checkRole middleware")
    next()
}

const checkUsernameExists = (req, res, next) => {!
    console.log("checkUsernameExists middleware")
    next()
}

const validateRoleName = (req, res, next) => {
    // console.log("validateRoleName middleware")
    // next()
    if(!req.body.role_name || !req.body.role_name.trim()){
        req.role_name = 'guest'
        return next()
      }else if(req.body.role_name.trim().length > 32){
        return next({status: 422, message: "Role name can not be longer than 32 chars"})
      }else{
        req.role_name = req.body.role_name.trim()
        next()
      }
}

module.exports = {
    restricted,
    checkRole,
    checkUsernameExists,
    validateRoleName,
  }
  