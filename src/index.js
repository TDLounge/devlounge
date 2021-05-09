import dotenv from 'dotenv/config';
import { Client } from './Client.js';

const client = new Client({
    embeds: {
        color: '#cf4a4a',
    },
});

const props = {};

client.loadEvents('src/events', props);
client.loadCommands('src/commands', props);

client.start(process.env.TOKEN);
