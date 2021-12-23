import { Knex } from 'knex';

export default (db: Knex) =>
    db.schema.createTable('user', (table) => {
        table.string('id', 18).primary();
        table.integer('coins').notNullable().defaultTo(0);
        table.integer('xp').notNullable().defaultTo(0);
    });
