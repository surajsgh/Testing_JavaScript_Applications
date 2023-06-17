const Cart = require('./Cart.js');
const assert = require('assert');

const cart = new Cart();
cart.addToCart('Cheesecake');

assert.deepStrictEqual(cart.items, ['Cheesecake']);

console.log('The addToCart function can add an item to the cart.');