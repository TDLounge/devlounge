import { getMessage } from '../utils/message';
import { command } from 'jellycommands';
import type { Knex } from 'knex';

export default command({
    name: 'rr',
    description: 'Creates a reaction role',

    global: true,
    defer: true,

    options: [
        {
            type: 'String',
            name: 'message',
            description: 'The message id to create the reaction role on',
            required: true,
        },
        {
            type: 'String',
            name: 'emoji',
            description: 'The emoji to react with',
            required: true,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'The role to assign to the user',
            required: true,
        },
    ],

    async run({ interaction, client }) {
        if (!interaction.inGuild()) {
            return void interaction.followUp(
                'This command can only be used in a guild',
            );
        }

        const message_id = interaction.options.getString('message', true);
        const emoji = interaction.options.getString('emoji', true);
        const role = interaction.options.getRole('role', true);
        const db = client.props.get<Knex>('db');

        const message = await getMessage(
            client,
            interaction.channelId,
            message_id,
        );

        if (!message) {
            return void interaction.followUp(
                'The message you specified does not exist',
            );
        }

        await message.react(emoji);

        await db('reaction_roles').insert({
            role_id: role.id,
            message_id,
            emoji,
        });

        interaction.followUp({
            ephemeral: true,
            embeds: [
                {
                    color: '#cf4a4a',
                    description: 'Reaction role created',
                },
            ],
        });
    },
});
