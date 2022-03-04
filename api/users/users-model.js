const db = require("../data/db-config");

function findAll(){
    return db('users')
}

async function findBy(filter){
    const row = await db('users').where(filter)
    return row
}

async function findById(id){
    const row = await db('users').where(id)
    return row
}

async function add(user){
    const [id] = await db('users').insert(user)
    return db('users')
}

module.exports = {
    findAll,
    findBy,
    findById,
    add,
}