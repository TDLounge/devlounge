import { getChannel, getMessage } from '../messages/util';
import { leaveMessages } from '../messages/messages';
import { EmbedBuilder } from 'discord.js';
import { event } from 'jellycommands';

export default event({
    name: 'guildMemberRemove',

    async run(_, member) {
        const channel = await getChannel(member.guild);
        if (!channel) return;

        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(getMessage(member.user, leaveMessages))
                    .setColor('#e06262'),
            ],
        });
    },
});
