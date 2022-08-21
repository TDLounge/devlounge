import { EmbedBuilder } from 'discord.js';
import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'shop',
    description: 'View and buy from the shop',

    options: [
        {
            name: 'view',
            description: 'View all items for sale',
            type: 'Subcommand',
        },
        {
            name: 'buy',
            description: 'Buy an item from the shop',
            type: 'Subcommand',

            options: [
                {
                    name: 'number',
                    description: 'The number (id) of the item',
                    type: 'Integer',
                    required: true,
                },
            ],
        },
    ],

    global: true,
    defer: true,

    run: async ({ interaction, client }): Promise<void> => {
        const command = interaction.options.getSubcommand(true);
        const db = client.props.get<Knex>('db');

        if (!interaction.inGuild()) return;

        if (command == 'buy') {
            const id = interaction.options.getInteger('number', true);

            const item = await db('shop')
                .select('name', 'price', 'role')
                .where({ id })
                .first();

            if (!item)
                return void interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#cf4a4a')
                            .setDescription(
                                "That item doesn't exist in the shop",
                            ),
                    ],
                });

            const member = await interaction.guild?.members.fetch(
                interaction.user.id,
            );

            if (!member)
                return void interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#cf4a4a')
                            .setDescription('Unable to find you'),
                    ],
                });

            if (member.roles.cache.has(item.role))
                return void interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#cf4a4a')
                            .setDescription(
                                `You already have the ${item.name} role`,
                            ),
                    ],
                });

            const user = await db('user')
                .select('coins')
                .where({ id: interaction.user.id })
                .first();

            if (!user || (user?.coins || 0) < item.price)
                return void interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#cf4a4a')
                            .setDescription(
                                `You need ${item.price} coins to buy this item`,
                            ),
                    ],
                });

            await member.roles.add(item.role);

            await db('user')
                .update({ coins: user.coins - item.price })
                .where({ id: interaction.user.id });

            return void interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#cf4a4a')
                        .setDescription(
                            `You bought the ${item.name} for ${item.price} coins`,
                        ),
                ],
            });
        }

        const items = await db('shop').select();

        interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setTitle('Welcome to the shop!')
                    .setDescription(
                        'To buy from the shop use `/shop buy <number>`',
                    )
                    .setFields(
                        items.map((item) => ({
                            name: `${item.id}) ${item.name} - ${item.price} coins`,
                            value: item.description,
                        })),
                    ),
            ],
        });
    },
});
