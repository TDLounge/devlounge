import { Client as DiscordClient, Collection, MessageEmbed } from 'discord.js';
import readdirRecursive from './util/readdirRecursive.js';
import { basename, normalize, resolve } from 'path';
import * as dash from 'dashargs';

const parse = dash.default.parse;

export class Client extends DiscordClient {
    #listening = false;
    #options;

    constructor(opt = {}) {
        super(opt);
        this.#options = opt;
    }

    generateEmbed(data) {
        data = { ...this.#options.embeds, ...data };
        return new MessageEmbed(data);
    }

    async loadEvents(dir, props = {}) {
        try {
            const events = readdirRecursive(resolve(dir))
                .filter(
                    (f) => f.endsWith('.js') && !basename(f).startsWith('_'),
                )
                .map((f) => ({ name: basename(f, '.js'), path: normalize(f) }));

            for (const { name, path } of events) {
                const { run } = await import(
                    'file://' + path.replace('C:/', '')
                );

                if (!run) console.log(`Unable to load ${name}`);

                this.on(name, run.bind(null, { client: this, ...props }));
            }
        } catch (e) {
            console.error(
                new Error(
                    'There has been an error loading events: ' + e.message,
                ),
            );
        }
    }

    async loadCommands(dir, props = {}) {
        this.commands = new Collection();
        this.commandHelp = [];

        try {
            const files = readdirRecursive(resolve(dir))
                .filter(
                    (f) => f.endsWith('.js') && !basename(f).startsWith('_'),
                )
                .map((f) => normalize(f));

            const commands = [];

            for (const path of files) {
                const require = await import(
                    'file://' + path.replace('C:/', '')
                );

                commands.push({
                    path,
                    meta: require.meta,
                    props,
                    require,
                });
            }

            await Promise.all(commands);

            for (const { meta, props, require } of commands) {
                if (!meta)
                    return console.log(
                        `Unable to load a command; ID: ${meta.id}. No meta given`,
                    );

                if (!meta.commands || !Array.isArray(meta.commands))
                    return console.log(
                        `Unable to load a command; ID: ${meta.id}. No valid command array given`,
                    );

                this.commandHelp.push({
                    ...meta,
                    string: (admin = false) =>
                        `${process.env.PREFIX}${
                            admin && meta.adminSyntax
                                ? meta.adminSyntax
                                : meta.id || meta.syntax
                        } - ${meta.description}`,
                });

                for (const command of meta.commands) {
                    if (this.commands.get(command))
                        return console.log(
                            `Unable to load command; ID: ${meta.id}. Command word ${command} is taken`,
                        );

                    this.commands.set(command, { props, ...require });

                    console.log(
                        `Loaded command word ${command} for ${meta.id}`,
                    );
                }
            }
        } catch (e) {
            console.error(
                new Error(
                    'There has been an error loading commands: ' + e.message,
                ),
            );
        }
    }

    start(token) {
        this.listenForCommands();
        this.login(token);
    }

    listenForCommands() {
        if (this.#listening) return console.log('Unable to listen twice');

        this.#listening = true;
        this.prefix = process.env.PREFIX;

        this.on('message', async (message) => {
            if (message.partial) message = await message.fetch();
            if (message.author.bot || !message.content.startsWith(this.prefix))
                return;

            const command = message.content
                .slice(this.prefix.length)
                .match(/^[\w\d]+/gi)[0];

            const args = message.content.slice(command.length).split(' ');

            const foundCommand = this.commands.get(command);

            if (foundCommand) {
                const result = await foundCommand.run({
                    client: this,
                    args,
                    message,
                    dash: parse(args.join(' ')),
                    ...foundCommand.props,
                });

                const embed =
                    typeof result == 'object'
                        ? this.generateEmbed(result)
                        : this.generateEmbed({ description: result });

                if (result) message.channel.send(embed);
            }
        });
    }
}
