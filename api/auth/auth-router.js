const router = require('express').Router()
const User = require('../users/users-model');
const bcrypt = require("bcryptjs");
const { JWT_SECRET, BCRYPT_ROUNDS } = require("../secrets");
// const makeToken = require('./auth-token-builder')
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');

// // TEST: http post :9000/api/auth/register username=foo password=1234
router.post('/register', 
// validateRoleName, 
async (req, res, next)=>{
    try{
        // res.status(201).json({message: `Great to have, `})
        const { username, password, role_id } = req.body
        // const {role_name} = req
        const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
        const newUser = await User.add({username, password: hash, role_id})
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
})



// http post :9000/api/auth/register username=foo password=1234
// http post :9000/api/auth/register username=faa password=1234 role_id:=1
// router.post('/register', async(req, res, next)=>{
//     let user = req.body
//     console.log("register user ",user)
//     const hash = bcrypt.hashSync(user.password , BCRYPT_ROUNDS)
//     user.password = hash
//     User.add(user)
//      .then( saved => {
//         res.status(201).json({massage: `Welcome register ${saved.username}...`  })
//      })
//      .catch(next)


//     // try {
//     //     const { username, password, role_id } = req.body
//     //     const hash = bcrypt.hashSync(password, 8) // 2 ^ 8
//     //     const newUser = {username, password: hash, role_id}
//     //     const data = await User.add(newUser)
//     //     res.status(201).json(data)
//     //     // res.json(data)
//     //   } catch (err) {
//     //     next(err)
//     //   }

// })

// TEST : http  post  :9000/api/auth/login username=bob password=1234
// TEST : http  post  :9000/api/auth/login username=foo password=1234
router.post('/login', checkUsernameExists, async (req, res, next)=>{
    try {
        let { username, password } = req.body
        const user = await User.findBy({username})
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
         return next({ status: 401, message: "Invalid credentials"})
        }
        req.user = user
        res.status(200).json({ message: `Welcome ${user.username}!`})
      } catch (err) {
        next(err)
      }
})
module.exports = router