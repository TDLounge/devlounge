import type { JellyCommands } from 'jellycommands';

export const getMessage = async (
    client: JellyCommands,
    channelId: string,
    messageId: string,
) => {
    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || !channel.isText()) return null;

        const message = await channel.messages.fetch(messageId);
        if (!message) return null;

        return message;
    } catch {
        return null;
    }
};
