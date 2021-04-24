import dotenv from 'dotenv/config.js';
import { Client } from './Client.js';

const client = new Client({
    embeds: {
        colour: '#cf4a4a',
    },
});

const props = {};

client.loadEvents('src/events', props);
client.loadCommands('src/commands', props);

client.start(process.env.TOKEN);
