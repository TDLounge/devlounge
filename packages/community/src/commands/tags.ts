import { EmbedBuilder } from 'discord.js';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'tags',
    description: 'Tags are pretty cool',

    options: [
        {
            name: 'view',
            description: 'View all the tags',
            type: 'Subcommand',
        },
        {
            name: 'get',
            description: 'Get a tag by name',
            type: 'Subcommand',
            options: [
                {
                    name: 'tag',
                    description: 'the tag',
                    type: 'String',
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
                .select('content')
                .where({ name })
                .first();

            if (!tag)
                return void interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#cf4a4a')
                            .setDescription(`Unable to find tag: \`${name}\``),
                    ],
                });

            return void interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#cf4a4a')
                        .setDescription(tag.content)
                        .setFooter({ text: `/tag ${name}` }),
                ],
            });
        }

        const tags = await db('tag').select('name', 'category');

        const fields: Record<string, string[]> = {};

        for (const { name, category } of tags) {
            const existing = fields[category] || [];
            fields[category] = [...existing, name];
        }

        interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setTitle('Tags')
                    .setFields(
                        Object.entries(fields).map(([name, value]) => ({
                            name,
                            value: value.map((x) => `\`${x}\``).join(', '),
                        })),
                    ),
            ],
        });
    },
});
