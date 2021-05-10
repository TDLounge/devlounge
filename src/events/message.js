import { parseCoins } from '../util/coins.js';
import { parseXP } from '../util/xp.js';

export const run = (...ctx) => {
    xp(...ctx);
    coins(...ctx);
    tags(...ctx);
};

const xpCooldown = new Map();
const coinsCooldown = new Map();

async function xp({ getDatabase }, message) {
    if (message.author.bot) return;

    const db = getDatabase('member');

    if (!xpCooldown.has(message.author.id)) {
        xpCooldown.set(message.author.id, true);
        setTimeout(
            () => xpCooldown.delete(message.author.id),
            Math.floor(Math.random() * 20000) + 10000,
        );
    } else return;

    const data = (await db.get(message.author.id)) || {};
    const current = await parseXP(data.xp);
    const xp = current + Math.floor(Math.random() * 30) + 15;

    db.set(message.author.id, { ...data, xp });
}

async function coins({ getDatabase, client }, message) {
    if (message.author.bot) return;

    const db = getDatabase('member');

    if (!coinsCooldown.has(message.author.id)) {
        coinsCooldown.set(message.author.id, true);
        setTimeout(
            () => coinsCooldown.delete(message.author.id),
            (Math.floor(Math.random() * 201) + 45) * 1000,
        );
    } else return;

    const data = (await db.get(message.author.id)) || {};
    const current = await parseCoins(data.xp);
    const random = Math.floor(Math.random() * 11) + 1;
    const coins = current + random;

    await db.set(message.author.id, { ...data, coins });

    const m = await message.channel.send(
        client.generateEmbed({
            author: {
                name: 'You Got Coins!',
                iconURL: message.author.displayAvatarURL(),
            },
            description: `Sweet! You found ${random} coins :tada:`,
            footer: {
                text: `You now have ${coins} coins`,
            },
        }),
    );

    m.delete({ timeout: 3000 });
}

async function tags({ getDatabase, client }, message) {
    if (message.author.bot) return;
    if (!message.content.startsWith('?')) return;

    const db = getDatabase('tags');

    const tag = message.content.slice(1).split(' ')[0];
    const data = await db.get(tag);

    if (!data)
        return message.channel.send(
            client.generateEmbed({
                description: "That tag doesn't exist",
            }),
        );

    message.channel.send(
        client.generateEmbed({
            description: data.content,
        }),
    );
}
