
// exports.seed = function(knex, Promise) {
//   return knex('user_role').insert([   
//     { role_type: 'instructor' },
//     { role_type: 'client' }
//   ]);
// };
exports.seed = function(knex, Promise) {
  return knex('user_role').insert([   
    { role_type: 'organizer' },
    { role_type: 'guest' }
  ]);
};
