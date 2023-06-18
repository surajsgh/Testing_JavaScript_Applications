const { createCart, addToCart } = require('./Cart.js');
const { db, closeConnection } = require("./dbConnection");

beforeEach(async () => {
  await db("carts").truncate();
  await db("cart_items").truncate();
})

afterAll(async () => await closeConnection());

test("createCart creates a cart with the username", async () => {
  await createCart("Suraj");
  const result = await db.select("username").from("carts");
  expect(result).toEqual([{ username: "Suraj"}]);
});

test("addToCart adds an item to the cart", async () => {
  const username = "Suraj";
  await createCart(username);
  const [{id: cartId}] = await db.select("id").from("carts").where({ username });
  await addToCart(cartId, "Cheesecake");

  const result = await db.select().from("cart_items");
  expect(result).toEqual([{ cartId, itemName: "Cheesecake"}]);
})
/*
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
*/