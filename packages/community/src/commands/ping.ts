import { EmbedBuilder } from 'discord.js';
import { command } from 'jellycommands';

export default command({
    name: 'ping',
    description: 'Ping pong!',

    global: true,

    run: ({ interaction }) =>
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setDescription(':ping_pong: Pong!'),
            ],
        }),
});
