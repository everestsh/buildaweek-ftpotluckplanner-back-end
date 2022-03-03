exports.up = async (knex) => {
  await knex.schema
  .createTable("user_role", (roles) => {
    roles.increments("role_id");
    roles.string("role_type", 128).notNullable().unique();
  })
  .createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable().unique();
    users.string("password", 200).notNullable();
    users.integer("role_id").notNullable()
      .unsigned()
      .notNullable()
      .references("role_id")
      .inTable("user_role")
      .onUpdate("RESTRICT")
      .onDelete("RESTRICT");
    users.timestamps(false, true);
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('user_role')
}
