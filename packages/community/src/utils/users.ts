import type { JellyCommands } from 'jellycommands';

export const getMember = async (
    client: JellyCommands,
    guildId: string,
    userId: string,
) => {
    try {
        const guild = await client.guilds.fetch(guildId);
        if (!guild) return null;

        const member = guild.members.fetch(userId);
        if (!member) return;

        return member;
    } catch {
        return null;
    }
};
