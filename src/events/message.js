import { MyKV } from 'mykv';

export const run = (...ctx) => xp(...ctx);

const setupCooldown = (cooldown, id) => {
    cooldown.set(id, true);
    setTimeout(
        () => cooldown.delete(id),
        Math.floor(Math.random() * 20000) + 10000,
    );
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

const xpCooldown = new Map();

async function xp({}, message) {
    if (message.author.bot) return;

    if (!xpCooldown.has(message.author.id))
        setupCooldown(xpCooldown, message.author.id);
    else return;

    await xpDB.connect();

    const data = await xpDB.get(message.author.id);
    const current = isNaN(data) ? 0 : data;
    const xp = current + Math.floor(Math.random() * 30) + 15;

    xpDB.set(message.author.id, xp);
}
