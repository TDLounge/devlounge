import type { Guild, User } from 'discord.js';

export const getMessage = (user: User, messages: string[]) => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    return message.replace(/{USER}/gm, `\`${user.username}\``);
};

export const getChannel = async (guild: Guild) => {
    const channel = await guild.channels.fetch(
        process.env['WELCOME_CHANNEL_ID']!,
    );

    if (!channel) return console.error('Unable to find welcome channel');
    if (!channel?.isText()) return console.error('Channel is not text');

    return channel;
};
