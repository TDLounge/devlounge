import knex from 'knex';

import reactionRolesSchema from './db/reaction_roles';
import shopSchema from './db/shop.js';
import userSchema from './db/user.js';
import tagSchema from './db/tag.js';

export default async () => {
    const db = knex({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: 'utf8mb4',
        },
        pool: {
            min: 1,
            max: 10,
        },
        acquireConnectionTimeout: 2500,
    });

    // Uncomment when you want to create the tables
    // await shopSchema(db);
    // await userSchema(db);
    // await tagSchema(db);
    // await reactionRolesSchema(db);

    return db;
};
