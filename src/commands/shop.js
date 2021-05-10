export const meta = {
    id: 'shop',
    commands: ['shop', 'store'],
    description: 'View the shop',
};

const subCommands = {
    add,
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

    const db = ctx.getDatabase('shop');
    const items = await db.entries();

    const fields = [];
    for (const [item, { price, description }] of items) {
        fields.push({
            name: `${item} - ${price} coins`,
            value: description,
        });
    }

    return {
        title: 'Welcome to the shop!',
        description: 'To buy from the shop type `.buy <item>`',
        fields,
    };
};

async function add({ dash, getDatabase }) {
    const { name, role, description } = dash;
    const price = Number(dash.price);

    if (!name || typeof name != 'string') return 'Please give a name';
    if (!description || typeof description != 'string')
        return 'Please give a description';
    if (!price || isNaN(price)) return 'Please give a price';
    if (!role || typeof role != 'string') return 'Please give a role';

    const db = getDatabase('shop');

    await db.set(name, {
        price,
        role,
        description,
    });

    return 'Item added to shop!';
}

async function remove({ args, getDatabase }) {
    const db = getDatabase('shop');

    const [name] = args;
    await db.del(name);

    return 'Item removed';
}
