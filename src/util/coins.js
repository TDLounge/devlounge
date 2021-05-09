export const parseCoins = async (data) => (isNaN(data) ? 0 : data);

export const getCoins = async (db, id) => {
    const { coins } = (await db.get(id)) || {};
    return isNaN(coins) ? 0 : coins;
};
