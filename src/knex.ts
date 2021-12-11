import knex from 'knex';

export default async () => {
    const db = knex({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 1,
            max: 10,
        },
        acquireConnectionTimeout: 2500,
    });

    await db.raw('SELECT 1+1 AS RESULT');

    return db;
};
