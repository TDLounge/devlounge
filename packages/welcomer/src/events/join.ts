import { getChannel, getMessage } from '../messages/util';
import { joinMessages } from '../messages/messages';
import { MessageEmbed } from 'discord.js';
import { event } from 'jellycommands';

export default event({
    name: 'guildMemberAdd',

    async run(_, member) {
        const channel = await getChannel(member.guild);
        if (!channel) return;

        await member.fetch();

        channel.send({
            content: member.toString(),
            embeds: [
                new MessageEmbed({
                    color: '#7de062',
                    description: getMessage(member.user, joinMessages),
                }),
            ],
        });
    },
});
