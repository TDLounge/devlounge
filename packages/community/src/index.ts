import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';
import knex from './knex.js';
import { join } from 'desm';

const db = await knex();

const client = new JellyCommands({
    clientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    },

    commands: join(import.meta.url, './src/commands'),
    events: join(import.meta.url, './src/events'),

    props: {
        db,
    },

    dev: {
        global: process.env['NODE_ENV'] == 'development',
        guilds: ['663140687591768074'],
    },
});

client.login(process.env.TOKEN);
