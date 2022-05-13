import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'coins',
    description: 'Check yours or others coins',

    options: [
        {
            name: 'user',
            description: 'The user whos coins you want to check',
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
            .select('coins')
            .where({ id: userId })
            .first();

        // prettier-ignore
        const description = `<@${userId}> ${userId == interaction.user.id ? 'you have' : 'has'} ${user?.coins || 0} coins`;

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
