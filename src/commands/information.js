import { run as emojis } from './emoji.js';

export const meta = {
    id: 'information',
    commands: ['info', 'information'],
    description: 'Get the servers information',
};

export const run = async ({ message }) => {
    const guild = await message.guild.fetch();

    return {
        title: 'The Dev Lounge Information',
        fields: [
            {
                name: 'Member information',
                value: `Total members: ${guild.approximateMemberCount}`,
            },
            {
                name: 'Boost information',
                value: `Tier: ${guild.premiumTier}\nBoosts: ${guild.premiumSubscriptionCount}`,
            },
            {
                name: 'Emojis',
                value: `Total: ${
                    guild.emojis.cache.size
                }\nEmojis: ${await emojis({
                    message,
                })}`,
            },
            {
                name: 'General Information',
                value: `Owner: ${guild.owner}\nRegion: ${
                    guild.region[0].toUpperCase() + guild.region.slice(1)
                }`,
            },
        ],
        thumbnail: {
            url: guild.iconURL(),
        },
    };
};
