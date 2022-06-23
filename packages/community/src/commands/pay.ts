import { command } from 'jellycommands';
import { Knex } from 'knex';

export default command({
    name: 'pay',
    description: 'Send another user coins',

    options: [
        {
            name: 'amount',
            description: 'Amount to send',
            type: 'INTEGER',
            required: true,
        },
        {
            name: 'recipient',
            description: 'User to send coins to',
            type: 'USER',
            required: true,
        },
    ],

    global: true,
    defer: true,

    run: async ({ interaction, client }): Promise<void> => {
        const db = client.props.get<Knex>('db');

        const amount = interaction.options.getInteger('amount', true);
        const recipient = interaction.options.getUser('recipient', true);

        const user = await db('user')
            .select('coins')
            .where({ id: interaction.user.id })
            .first();

        const currentCoins = user?.coins || 0;

        if (!user || currentCoins < amount)
            return void interaction.followUp({
                embeds: [
                    {
                        color: '#cf4a4a',
                        description: `You don't have enough coins`,
                    },
                ],
            });

        await db('user')
            .update({ coins: currentCoins - amount })
            .where({ id: interaction.user.id });

        const recipientCoins = await db('user')
            .select('coins')
            .where({ id: recipient.id })
            .first();

        if (recipientCoins) {
            await db('user')
                .update({ coins: recipientCoins.coins + amount })
                .where({ id: recipient.id });
        } else {
            await db('user').insert({ id: recipient.id, coins: amount });
        }

        interaction.followUp({
            embeds: [
                {
                    color: '#cf4a4a',
                    description: `${recipient.toString()} was sent ${amount} coins`,
                },
            ],
        });
    },
});
