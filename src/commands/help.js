export const meta = {
    id: 'help',
    commands: ['help', 'commands'],
    description: 'Get this menu',
};

export const run = async ({ client, dash }) => ({
    title: 'Command Help Menu',
    description: client.commandHelp
        .map((x) => x.string(dash.has('show-admin')))
        .join('\n'),
});
