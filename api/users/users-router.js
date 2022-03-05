const router = require('express').Router()
const User = require('./users-model')
const { restricted, checkRole } = require('../auth/auth-middleware')


// TEST: http get  :9000/api/users
// TEST: http get  :9000/api/users Authorization:$2a$08$XK9X037FTUnGio/db/WeGef6pFO/FRFAhs9DUOmzlGal0/LssjJ4u
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

router.get("/:id", restricted, (req, res, next) => {
    User.findById(req.params.id)
    .then(users => {
      res.json(users)
    })
    .catch(next) 
  })

module.exports = router