import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'tags',
    description: 'Tags are pretty cool',

    options: [
        {
            name: 'view',
            description: 'View all the tags',
            type: ApplicationCommandOptionTypes['SUB_COMMAND'],
        },
        {
            name: 'get',
            description: 'Get a tag by name',
            type: ApplicationCommandOptionTypes['SUB_COMMAND'],
            options: [
                {
                    name: 'tag',
                    description: 'the tag',
                    type: ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        },
    ],

    global: true,
    defer: true,

    run: async ({ interaction, client }): Promise<void> => {
        const subCommand = interaction.options.getSubcommand(true);
        const db = client.props.get<Knex>('db');

        if (subCommand == 'get') {
            const name = interaction.options.getString('tag', true);

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

            return void interaction.followUp({
                embeds: [
                    {
                        color: '#cf4a4a',
                        description: tag.content,
                        footer: {
                            text: `/tag ${name}`,
                        },
                    },
                ],
            });
        }

        const tags = await db('tag').select<
            { name: string; category: string }[]
        >('name', 'category');

        const fields: Record<string, string[]> = {};

        for (const { name, category } of tags) {
            const existing = fields[category] || [];
            fields[category] = [...existing, name];
        }

        interaction.followUp({
            embeds: [
                {
                    color: '#cf4a4a',
                    title: 'Tags',
                    fields: Object.entries(fields).map(([name, value]) => ({
                        name,
                        value: value.map((x) => `\`${x}\``).join(', '),
                    })),
                },
            ],
        });
    },
});
