import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';
import knex from './knex.js';

const db = await knex();

const client = new JellyCommands({
    clientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    },

    commands: ['dist/commands'],
    events: 'dist/events',

    props: {
        db,
    },

    dev: {
        guilds: ['663140687591768074'],
    },
});

client.login(process.env.TOKEN);
