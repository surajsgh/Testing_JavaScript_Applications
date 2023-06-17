const Cart = require('./Cart.js');

const cart = new Cart();
cart.addToCart('Cupcake');

const hasAnItem = cart.items.length === 1; 
const hasACheeseCake = cart.items[0] === 'Cheesecake';

if (hasAnItem && hasACheeseCake) {
  console.log('The addToCart function can add an item to the cart.');
}
else {
  const items = cart.items.join(', ');

  console.error('The add to cart function did not do what we expect.');
  console.error(`Here are the actual content of the cart: ${items}`);

  throw new Error("The Test case failed");
}