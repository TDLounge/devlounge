import { createSlashCommand } from 'jellycommands';
import pkg from '../../package.json';

const credits = `
Created and founded by <@282839711834177537>
All systems coded by <@282839711834177537>
Logo and art made by <@787002534145294336>
Shop & Tag system inspired by [Sourcebot](https://github.com/TheSourceCodeLLC/Source)

Bot version: v${pkg.version}
`;

export default createSlashCommand('credits', {
    description: 'Get devlounge credits',

    global: true,

    run: async ({ interaction }) =>
        interaction.followUp({
            embeds: [
                {
                    title: 'Credits',
                    color: '#cf4a4a',
                    description: credits.trim(),
                },
            ],
        }),
});
