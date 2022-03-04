
const restricted = (req, res, next) => {!
    console.log("restricted middleware")
    next()
}
const checkRole = role =>  (req, res, next) => {
    console.log("checkRole middleware")
    next()
}
module.exports = {
    restricted,
    checkRole,
  }
  