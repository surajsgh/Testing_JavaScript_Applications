const Cart = require('./Cart.js');

//  TEST HELPS US TO ORGANISE MULTIPLE TESTS WITHIN A SINGLE FILE AND INDICATES WHAT SHOULD RUN
test("The addToCart function can add an item to the cart.", () => {
  //  ARRANGE
  const cart = new Cart();

  //  ACTS
  cart.addToCart('Cheesecake');

  //  ASSERTS
  expect(cart.items).toEqual(['Cheesecake']);
});

test("The removeAnItemFromCart function can remove an item to the cart.", () => {
  //  ARRANGE
  const cart = new Cart();
  cart.addToCart('Cheesecake');

  //  ACTS
  cart.removeAnItemFromCart('Cheesecake');

   //  ASSERTS
  expect(cart.items).toEqual([]);
});

test("The removeAllItemsFromCart function can remove an item to the cart.", () => {
  const cart = new Cart();
  cart.addToCart('Cheesecake');
  cart.addToCart('Cupcake');
  cart.removeAllItemsFromCart();
  expect(cart.items).toEqual([]);
})