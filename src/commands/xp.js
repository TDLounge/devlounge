import { number } from '../util/assert.js';

export const meta = {
    id: 'level',
    commands: ['xp', 'level'],
    description: 'View your (or someone elses) level and xp',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const user = message.mentions.users.first() || message.author;
    const data = await db.get(user.id);
    const xp = number(data.xp);
    const level = Math.floor(xp / 100);

    return {
        description: `<@${user.id}> You are level ${level}, with ${xp} xp!`,
    };
};
