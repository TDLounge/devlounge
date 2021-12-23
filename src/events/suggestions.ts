import { event } from 'jellycommands';

const suggestionChannelIds = ['767854644813627454'];

export default event({
    name: 'messageCreate',

    run: async ({}, message) => {
        if (message.author.bot) return;
        if (!suggestionChannelIds.includes(message.channel.id)) return;

        if (message.deletable) await message.delete();

        const suggestion = await message.channel.send({
            embeds: [
                {
                    color: '#cf4a4a',
                    author: {
                        iconURL: message.author.avatarURL()!,
                        name: `Suggestion from ${message.author.username}`,
                    },
                    description: message.content,
                },
            ],
        });

        await suggestion.react('✅');
        await suggestion.react('❌');
    },
});
