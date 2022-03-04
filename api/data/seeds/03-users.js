/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

   
 const bcrypt = require("bcryptjs");

 const hash = bcrypt.hashSync("1234", 8);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'robert', password: hash, role_id: 1},
        { username: 'tom', password: hash, role_id: 1},
        { username: 'jimmy', password: hash, role_id: 2},
        { username: 'susan', password: hash, role_id: 2},
      ]);
    });
};
