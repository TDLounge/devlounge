export const getLevel = (xp) => Math.floor(xp / 100);

export const getXP = async (db, id) => {
    const data = await db.get(id);
    return isNaN(data) ? 0 : data;
};
