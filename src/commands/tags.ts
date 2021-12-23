import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'tags',
    description: 'Tags are pretty cool',

    options: [
        {
            name: 'tag',
            description: 'the tag',
            type: ApplicationCommandOptionTypes.STRING,
            required: true,
        },
    ],

    global: true,
    defer: true,

    run: async ({ interaction, client }): Promise<void> => {
        const name = interaction.options.getString('tag', true);
        const db = client.props.get<Knex>('db');

        const tag = await db('tag')
            .select<{ content: string }>('content')
            .where({ name })
            .first();

        if (!tag)
            return void interaction.followUp({
                embeds: [
                    {
                        color: '#cf4a4a',
                        description: `Unable to find tag: \`${name}\``,
                    },
                ],
            });

        interaction.followUp({
            embeds: [{ color: '#cf4a4a', description: tag.content }],
        });
    },
});
