import { Knex } from 'knex';

export interface ShopTable {
    id: number;
    name: string;
    price: number;
    description: string;
    role: string;
}

export default (db: Knex) =>
    db.schema.createTable('shop', (table) => {
        table.increments('id').primary();
        table.string('name', 16).notNullable();
        table.integer('price').notNullable();
        table.text('description').notNullable();
        table.string('role').notNullable();
    });
