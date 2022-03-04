const db = require("../data/db-config");

function findAll(){
    return db('users')
}

async function findBy(filter){
    const row = await db('users').where(filter).first()
    return row
}

async function findById(user_id){
    const result = await db('users').where('user_id', user_id).first()
    console.log(result)
    return result
}

async function add(user){
    /*
        INSERT INTO users (username, password, role_id) VALUES ('JIM', 1234, 1) 
    */
    // const [{ username, password, role_type }] = await db('users').insert(user)
    const [{user_id}] = await db('users').insert(
        {
            username: user.username,
            password: user.password,
            role_id: user.role_id,
        },
        ['user_id']
        );
   
    console.log(user_id)
    return findById(user_id)
}

module.exports = {
    findAll,
    findBy,
    findById,
    add,
}