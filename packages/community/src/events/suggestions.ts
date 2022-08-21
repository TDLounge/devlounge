import { EmbedBuilder } from 'discord.js';
import { event } from 'jellycommands';

const suggestionChannelIds = ['767854644813627454'];

export default event({
    name: 'messageCreate',

    run: async ({}, message) => {
        if (message.partial) {
            message = await message.fetch();
        }

        if (message.author.bot) return;
        if (!suggestionChannelIds.includes(message.channel.id)) return;

        if (message.deletable) await message.delete();

        const suggestion = await message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setAuthor({
                        iconURL: message.author.avatarURL()!,
                        name: `Suggestion from ${message.author.username}`,
                    })
                    .setDescription(message.content),
            ],
        });

        await suggestion.react('✅');
        await suggestion.react('❌');
    },
});
