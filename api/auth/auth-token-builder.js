const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets')

// TEST: http :9000/api/users 
// TEST: http :9000/api/users Authorization:garbage_token
// TEST: http get  :9000/api/users Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6ImZhYSIsImlhdCI6MTY0NjQzODE3NCwiZXhwIjoxNjQ2NTI0NTc0fQ.vQt4mOp_UxnbAs4bt03xfbBGJMgA_-RF_vH8WJt_XoU
function tokenBuilder (user){
    // console.log(JWT_SECRET)
    // return 'The awesome token'
    const payload = {
        subject : user.user_id,
        username : user.username,
        role_name : user.role_name,
    }
    const option = {
        expiresIn: '1d',
    }
    const token = jwt.sign(payload, JWT_SECRET, option)
    return token
}

module.exports = tokenBuilder