import { getVersion } from '../util/version.js';

export const meta = {
    id: 'credits',
    commands: ['credits'],
    description: 'See the people that made this server what it is',
};

export const run = async () => ({
    title: 'Credits',
    description: [
        'Created and founded by <@282839711834177537>',
        'All systems coded by <@282839711834177537>',
        'Logo art made by <@787002534145294336>',
        'Shop & Tag system inspired by [SourceBot](https://github.com/TheSourceCodeLLC/Source)',
        '',
        `Bot version: ${getVersion()}`,
    ].join('\n'),
});
