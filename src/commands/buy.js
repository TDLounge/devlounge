export const meta = {
    id: 'buy',
    commands: ['buy'],
    description: 'Buy a item in the shop',
};

export const run = async ({ message, args, getDatabase }) => {
    const [item] = args;
    if (!item) return 'Please give the item you want to buy';

    const db = getDatabase('shop');
    const data = await db.get(item);

    if (!data) return 'Unable to find that item, it is case sensitive!';

    const udb = getDatabase('member');
    const udata = (await udb.get(message.author.id)) || {
        coins: 0,
        purchased: [],
    };

    const coins = udata.coins || 0;
    const purchased = udata.purchased || [];
    const { price, role } = data;

    if (purchased.includes(item)) return 'You already own this';
    if (coins < price) return "You can't afford that";

    await udb.set(message.author.id, {
        ...udata,
        coins: coins - price,
        purchased: [...udata.purchased, item],
    });

    await message.member.roles.add(role);

    return `You successfully purchased ${item}`;
};
