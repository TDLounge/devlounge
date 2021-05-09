import { MyKV } from 'mykv';

export const meta = {
    id: 'xp',
    commands: ['xp'],
    description: 'View your xp amount',
};

const hostInformation = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};

const xpDB = new MyKV({
    ...hostInformation,
    table: 'xp',
});

export const run = async ({ message }) => {
    await xpDB.connect();

    const data = await xpDB.get(message.author.id);
    const current = isNaN(data) ? 0 : data;

    return {
        description: `<@${message.author.id}> You have ${current} xp`,
    };
};
