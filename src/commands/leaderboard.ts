import { toLevel } from '../utils/levels.js';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'leaderboard',
    description: 'Check the leaderboard of coins and level!',

    global: true,
    defer: true,

    run: async ({ interaction, client }) => {
        const db = client.props.get<Knex>('db');

        const coinData = await db('user')
            .select<[{ id: string; coins: number }]>('id', 'coins')
            .limit(10)
            .orderBy('coins', 'desc');

        const xpData = await db('user')
            .select<[{ id: string; xp: number }]>('id', 'xp')
            .limit(10)
            .orderBy('xp', 'desc');

        const coinBoard = coinData.map(
            ({ id, coins }, i) => `${i + 1}) <@${id}> \`${coins}\` coins`,
        );

        const xpBoard = xpData.map(
            ({ id, xp }, i) => `${i + 1}) <@${id}> \`${xp}\` (Level ${toLevel(xp)})`,
        );

        interaction.followUp({
            embeds: [
                {
                    color: '#cf4a4a',
                    fields: [
                        { name: 'Coins Leaderboard', value: coinBoard.join('\n') },
                        { name: 'XP Leaderboard', value: xpBoard.join('\n' },
                    ],
                },
            ],
        });
    },
});
