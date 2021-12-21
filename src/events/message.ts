import { event } from 'jellycommands';
import { Knex } from 'knex';

const ran = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const cooldown = new Map();

export default event({
    name: 'messageCreate',

    run: async ({ client }, message) => {
        if (message.author.bot) return;

        // prettier-ignore
        if (cooldown.has(message.author.id) && cooldown.get(message.author.id) > Date.now()) return;

        const db = client.props.get<Knex>('db');

        const user = await db('user')
            .select('coins', 'xp')
            .where({ id: message.author.id })
            .first();

        const coins = ran(4, 18);
        const xp = ran(14, 26);

        if (user) {
            await db('user')
                .update({ coins: user.coins + coins, xp: user.xp + xp })
                .where({ id: message.author.id });
        } else {
            await db('user').insert({ id: message.author.id, coins, xp });
        }

        cooldown.set(message.author.id, Date.now() + ran(18000, 32000));
    },
});
