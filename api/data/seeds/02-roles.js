
exports.seed = function(knex, Promise) {
  return knex('user_role').insert([   
    { role_type: 'instructor' },
    { role_type: 'client' }
  ]);
};
