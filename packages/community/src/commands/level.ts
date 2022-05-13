import { toLevel } from '../utils/levels.js';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'level',
    description: 'Check yours or others level',

    options: [
        {
            name: 'user',
            description: 'The user whos level you want to check',
            type: 'USER',
            required: false,
        },
    ],

    global: true,

    defer: true,

    run: async ({ interaction, client }) => {
        const userId =
            interaction.options.getUser('user')?.id ?? interaction.user.id;

        const db = client.props.get<Knex>('db');

        const user = await db('user')
            .select('xp')
            .where({ id: userId })
            .first();

        console.log(user);

        // prettier-ignore
        const description = `<@${userId}> ${userId == interaction.user.id ? 'you are' : 'is'} level ${toLevel(user.xp)}`;

        interaction.followUp({
            embeds: [
                {
                    color: '#cf4a4a',
                    description,
                },
            ],
        });
    },
});
