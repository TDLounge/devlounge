import { createSlashCommand } from 'jellycommands';

export default createSlashCommand('ping', {
    description: 'Ping pong!',

    global: true,

    run: ({ interaction }) =>
        interaction.reply({
            embeds: [
                {
                    description: ':ping_pong: Pong!',
                    color: '#cf4a4a',
                },
            ],
        }),
});
