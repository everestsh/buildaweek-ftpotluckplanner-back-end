/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_role').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_role').insert([
        { role_type: 'instructor' },
        { role_type: 'client' }
      ]);
    });
};
