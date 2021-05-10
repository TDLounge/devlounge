export const meta = {
    id: 'tags',
    commands: ['tags'],
    description: 'View all the tags',
};

const subCommands = {
    set,
    remove,
};

export const run = async (ctx) => {
    const sub = ctx.args.shift();
    if (
        sub &&
        subCommands[sub] &&
        ctx.message.author.id == '282839711834177537'
    )
        return subCommands[sub](ctx);

    const db = ctx.getDatabase('tags');
    const tags = await db.entries();

    if (tags.length == 0) return 'There are no tags';

    const grouped = new Map();
    for (const [tag, { category }] of tags) {
        grouped.set(category, [...(grouped.get(category) || []), tag]);
    }

    const fields = [];
    for (const [category, tags] of grouped.entries()) {
        fields.push({
            name: category[0].toUpperCase() + category.slice(1),
            value: tags.map((x) => `\`${x}\``).join(', '),
        });
    }

    return {
        title: 'Tags list',
        fields,
    };
};

async function set({ getDatabase, dash }) {
    const db = getDatabase('tags');

    const { name, content } = dash;
    const category = (dash.category || 'miscellaneous').toLowerCase();

    if (!name || typeof name != 'string') return 'Please give a name';

    if (!content || typeof content != 'string')
        return 'Please give some content';

    if (!category || typeof category != 'string')
        return 'Please give a category';

    await db.set(name, { content, category });

    return 'Tag created!';
}

async function remove({ getDatabase, args }) {
    const db = getDatabase('tags');

    const [tag] = args;
    if (!tag) return 'Please give a tag to delete';

    await db.del(tag);

    return 'Tag deleted!';
}
