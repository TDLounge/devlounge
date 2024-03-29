import { command } from 'jellycommands';
import { readFileSync } from 'fs';
import { EmbedBuilder } from 'discord.js';

const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));

const credits = `
Created and founded by <@282839711834177537>
All systems coded by <@282839711834177537> & <@724379828748550215> - [Github](https://github.com/ghostdevv/devlounge)
Logo and art made by <@787002534145294336>
Shop & Tag system inspired by [Sourcebot](https://github.com/TheSourceCodeLLC/Source)

Bot version: v${version}
`;

export default command({
    name: 'credits',
    description: 'Get devlounge credits',

    global: true,

    run: async ({ interaction }) =>
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#cf4a4a')
                    .setTitle('Credits')
                    .setDescription(credits.trim()),
            ],
        }),
});
