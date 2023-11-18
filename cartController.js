const {removeInventoryFromItem} = require('./inventoryController');
const logger = require('./logger/logger'); 

const carts = new Map();

const addItemToCart = (username, item) => {
    removeInventoryFromItem(item);
    const newItems = (carts.get(username) || []).concat(item);
    carts.set(username, newItems);
    logger.log(`${item} has been added to the cart.`);
    return newItems;
}

module.exports = {
    addItemToCart,
    carts
}