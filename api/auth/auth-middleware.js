const User = require('../users/users-model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../secrets");
const db = require("../data/db-config");

const restricted = (req, res, next) => {
    // console.log("restricted middleware")
    // next()
    const token = req.headers.authorization
    if(!token){
      next({ status: 401, message:  "Token required"});
    }else{
      jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
        if(err){
          next({ status: 401, message:  "Token invalid" }); 
        }else{
          req.decodedJwt = decodedToken
          next()
        }
      })
    }
}
const checkRole = role =>  (req, res, next) => {
    console.log("checkRole middleware")
    next()
}

const checkUsernameExists = async (req, res, next) => {
    // console.log("checkUsernameExists middleware")
    // next()
    try{
        // console.log(req.body.username)
        const existUser = await User.findBy({username: req.body.username})
        console.log(existUser)
        if(existUser){
          req.user = existUser
          next()
        }else{
          next({"message": "Invalid credentials", status: 401})
        }
      }catch(err){
        next(err)
      }
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
const checkAccountNameUnique = async (req, res, next) => {
    // console.log('checkAccountNameUnique middleware')
    // next()
    try{
      const existing = await db('users').where('username', req.body.username.trim()).first()
      if(existing){
        next({status:400, message: "that username is taken"})
      }else{
        next()
      }
    }catch(err){
      next(err)
    }
  }

module.exports = {
    restricted,
    checkRole,
    checkUsernameExists,
    validateRoleName,
    checkAccountNameUnique,
  }
  