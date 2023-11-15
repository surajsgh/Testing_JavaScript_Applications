const logger = require("./logger");

const inventory = new Map();

const getInventory = () => {
    const contentArray = Array.from(inventory.entries());
    const contents = contentArray.reduce((contents, [name, quantity]) => {
        return {...contents, [name]: quantity};
    }, {});

    logger.logInfo({contents}, 'fetched contents successfully');
    return {...contents, generatedAt: new Date()};
}

const addToInventory = (item, quantity) => {
    if(!+quantity) {
        logger.logError({item, quantity}, 'Quantity must be a number');
        throw new Error('Quantity must be a number')
    };
    const currentQuantity = inventory.get(item) || 0;
    const newQuantity = currentQuantity + quantity;
    inventory.set(item, newQuantity);
    logger.logInfo({item, newQuantity}, 'Items added into the inventory successfully.');
    return newQuantity;
}

module.exports = {
    inventory,
    addToInventory,
    getInventory
}