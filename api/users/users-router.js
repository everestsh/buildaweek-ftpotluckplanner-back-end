const router = require('express').Router()
const User = require('./users-model')
const { restricted, checkRole } = require('../auth/auth-middleware')


// TEST: http get  :9000/api/users
router.get('/', 
restricted,
checkRole('admin'),
async (req, res, next) => {
    // res.json(await User.findAll())
    User.findAll()
        .then( user => {
            res.json(user)
        })
        .catch(next)
})


module.exports = router