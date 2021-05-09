export const meta = {
    id: 'pay',
    commands: ['pay'],
    description: 'Send money to another user',
};

export const run = async ({ message, getDatabase, args }) => {
    const db = getDatabase('member');

    const user = message.mentions.users.first();
    if (!user)
        return {
            description: 'Please give a user to pay | pay <@user> <amount>',
        };

    if (user.id == message.author.id)
        return { description: "You can't to pay yourself" };

    const amount = Number(args[1]);
    if (!amount || isNaN(amount))
        return { description: 'Please give an amount | pay <@user> <amount>' };

    const df = (await db.get(message.author.id)) || { coins: 0 };
    const dt = (await db.get(user.id)) || { coins: 0 };

    const from = df.coins;
    const to = dt.coins;

    if (from < amount)
        return { description: "You don't have enough coins to do this" };

    await db.set(message.author.id, { ...df, coins: from - amount });
    await db.set(user.id, { ...dt, coins: to + amount });

    return {
        description: `<@${user.id}> has been sent ${to + amount} coins`,
    };
};
