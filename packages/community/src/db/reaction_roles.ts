import type { Knex } from 'knex';

export interface ReactionRoleTable {
    id: number;
    message_id: string;
    role_id: string;
    emoji: string;
}

export default (db: Knex) =>
    db.schema.createTable('reaction_roles', (table) => {
        table.increments('id').primary();
        table.string('message_id', 18).notNullable();
        table.string('role_id', 18).notNullable();
        table.text('emoji').notNullable();
        table.collate('utf8mb4_unicode_ci');
        table.charset('utf8mb4');
    });
