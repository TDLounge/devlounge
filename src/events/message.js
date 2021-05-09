import { getXP } from '../util/xp.js';

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

    const db = getDatabase('xp');

    if (!xpCooldown.has(message.author.id))
        setupCooldown(xpCooldown, message.author.id);
    else return;

    const current = await getXP(db, message.author.id);
    const xp = current + Math.floor(Math.random() * 30) + 15;

    db.set(message.author.id, xp);
}
