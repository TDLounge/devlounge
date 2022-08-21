import { EmbedBuilder, Guild } from 'discord.js';
import { command } from 'jellycommands';
import { readFileSync } from 'fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));

export default command({
    name: 'information',
    description: 'Get information about the server',

    global: true,

    defer: true,

    run: async ({ interaction }) => {
        const guild = interaction.guild as Guild;

        const emojis = await guild.emojis.fetch();
        const owner = await guild.fetchOwner();

        const displayEmojis = emojis
            .map((emoji) => emoji.toString())
            .join('  ');

        interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setTitle('The Dev Lounge Information')
                    .setThumbnail(guild.iconURL() || null)
                    .setFields([
                        {
                            name: 'Member information',
                            value: `Total members: ${guild.memberCount}`,
                        },
                        {
                            name: 'Boost information',
                            value: `Tier: ${guild.premiumTier}\nBoosts: ${guild.premiumSubscriptionCount}`,
                        },
                        {
                            name: 'Emojis',
                            value: `Total: ${emojis.size}\nEmojis: ${displayEmojis}`,
                        },
                        {
                            name: 'General Information',
                            value: `Owner: ${owner.user.username}`,
                        },
                        {
                            name: 'Bot',
                            value: `Version: ${version} | [Github](https://github.com/ghostdevv/devlounge)`,
                        },
                    ]),
            ],
        });
    },
});
