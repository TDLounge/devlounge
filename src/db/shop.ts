import { Knex } from 'knex';

export default (db: Knex) =>
    db.schema.createTable('shop', (table) => {
        table.increments('id').primary();
        table.string('name', 16).notNullable();
        table.integer('price').notNullable();
        table.text('description').notNullable();
        table.string('role').notNullable();
    });
