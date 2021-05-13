export const meta = {
    id: 'leaderboard',
    commands: ['leaderboard'],
    description: 'View the leaderboard for xp!',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const entries = await db.entries();
    const parsed = entries
        .filter(([, { xp }]) => !!xp)
        .sort(([, a], [, b]) => b.xp - a.xp)
        .map(([id, { xp }]) => [id, { xp, level: Math.floor(xp / 100) }])
        .slice(0, 10);

    return {
        title: 'Leaderboard',
        description: parsed
            .map(
                ([id, { level, xp }], i) =>
                    `${i + 1}) <@${id}>: Level: ${level}, XP: ${xp}`,
            )
            .join('\n'),
    };
};
