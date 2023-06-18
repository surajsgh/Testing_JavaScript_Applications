const { db } = require("./dbConnection");

//  CREATES THE CART
const createCart = username => db("carts").insert({username});

// ADDS ITEMS TO THE CART
const addToCart = (cartId, itemName) => {
  return db("cart_items").insert({cartId, itemName});
};

module.exports = {
  createCart,
  addToCart
};