import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'shop',
    description: 'View and buy from the shop',

    options: [
        {
            name: 'view',
            description: 'View all items for sale',
            type: 'SUB_COMMAND',
        },
        {
            name: 'buy',
            description: 'Buy an item from the shop',
            type: 'SUB_COMMAND',

            options: [
                {
                    name: 'number',
                    description: 'The number (id) of the item',
                    type: 'INTEGER',
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
                        {
                            color: '#cf4a4a',
                            description: "That item doesn't exist in the shop",
                        },
                    ],
                });

            const member = await interaction.guild?.members.fetch(
                interaction.user.id,
            );

            if (!member)
                return void interaction.followUp({
                    embeds: [
                        {
                            color: '#cf4a4a',
                            description: 'Unable to find you',
                        },
                    ],
                });

            if (member.roles.cache.has(item.role))
                return void interaction.followUp({
                    embeds: [
                        {
                            color: '#cf4a4a',
                            description: 'You already purchased this item',
                        },
                    ],
                });

            const user = await db('user')
                .select('coins')
                .where({ id: interaction.user.id })
                .first();

            if (!user || (user?.coins || 0) < item.price)
                return void interaction.followUp({
                    embeds: [
                        {
                            color: '#cf4a4a',
                            description: "You can't afford that item",
                        },
                    ],
                });

            await member.roles.add(item.role);

            await db('user')
                .update({ coins: user.coins - item.price })
                .where({ id: interaction.user.id });

            return void interaction.followUp({
                embeds: [
                    {
                        color: '#cf4a4a',
                        description: `You bought ${item.name} for ${item.price} coins`,
                    },
                ],
            });
        }

        const items = await db('shop').select();

        interaction.followUp({
            embeds: [
                {
                    color: '#cf4a4a',
                    title: 'Welcome to the shop!',
                    description:
                        'To buy from the shop use `/shop buy <number>`',

                    fields: items.map((item) => ({
                        name: `${item.id}) ${item.name} - ${item.price} coins`,
                        value: item.description,
                    })),
                },
            ],
        });
    },
});
