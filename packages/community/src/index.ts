import 'dotenv/config';
import { IntentsBitField, Partials } from 'discord.js';
import { JellyCommands } from 'jellycommands';
import knex from './knex.js';
import { join } from 'desm';

const db = await knex();

const client = new JellyCommands({
    clientOptions: {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMessageReactions,
        ],

        partials: [Partials.Message, Partials.Reaction],
    },

    commands: join(import.meta.url, './commands'),
    events: join(import.meta.url, './events'),

    props: {
        db,
    },

    debug: true,

    dev: {
        global: process.env['NODE_ENV'] == 'development',
        guilds: ['663140687591768074'],
    },
});

client.login(process.env.TOKEN);
