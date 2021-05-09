import { parseXP } from '../util/xp.js';

export const run = (...ctx) => xp(...ctx);

const setupCooldown = (cooldown, id) => {
    cooldown.set(id, true);
    setTimeout(
        () => cooldown.delete(id),
        Math.floor(Math.random() * 20000) + 10000,
    );
};

const xpCooldown = new Map();

async function xp({ getDatabase }, message) {
    if (message.author.bot) return;

    const db = getDatabase('member');

    if (!xpCooldown.has(message.author.id))
        setupCooldown(xpCooldown, message.author.id);
    else return;

    const data = (await db.get(message.author.id)) || {};
    const current = await parseXP(data.xp);
    const xp = current + Math.floor(Math.random() * 30) + 15;

    db.set(message.author.id, { ...data, xp });
}
