const inventory = new Map();

const addToInventory = (item, quantity) => {
    // if(!+quantity) throw new Error('Quantity must be a number');
    const currentQuantity = inventory.get(item) || 0;
    const newQuantity = currentQuantity + quantity;
    inventory.set(item, newQuantity);
    return newQuantity;
}

module.exports = {
    inventory,
    addToInventory
}