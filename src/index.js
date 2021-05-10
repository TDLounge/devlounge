import dotenv from 'dotenv/config';
import { Client } from './Client.js';
import { MyKV } from 'mykv';

const client = new Client({
    embeds: {
        color: '#cf4a4a',
    },
});

const dbInformation = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};

const databases = new Map(
    Object.entries({
        member: new MyKV({
            ...dbInformation,
            table: 'member',
        }),
        tags: new MyKV({
            ...dbInformation,
            table: 'tags',
        }),
    }),
);

databases.forEach((x) => x.connect());

const props = {
    databases,
    getDatabase: (name) => {
        const db = databases.get(name);
        db.connect();
        return db;
    },
};

client.loadEvents('src/events', props);
client.loadCommands('src/commands', props);

client.start(process.env.TOKEN);
