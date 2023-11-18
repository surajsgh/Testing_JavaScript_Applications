const Koa = require('koa');
const Router = require('koa-router');
const { getInventory, addItemToCart, carts } = require('./cartController.js');
const { inventory } = require('./inventoryController.js');

const app = new Koa();
const router = new Router();
// const carts = new Map();
// const inventory = new Map();

router.get('/carts/:username/items', ctx => {
  const cart = carts.get(ctx.params.username);
  cart ? (ctx.body = cart) : (ctx.status = 404);
});

router.post('/carts/:username/items/:item', ctx => {
  const { username, item } = ctx.params;
  try {
    const newItems = addItemToCart(username, item);
    ctx.body = newItems;
  } catch (error) {
    ctx.body = {message: error.message};
    ctx.status = error.statusCode;
    return;
  }
});

router.delete('/carts/:username/items/:item', ctx => {
  const { username, item } = ctx.params;
  if(!carts.has(username) || !carts.get(username).includes(item)) {
    ctx.body = `${item} is not in the cart.`;
    ctx.status = 400;
    return;
  }

  const newItems = (carts.get(username) || []).filter((cartItem => cartItem !== item));
  inventory.set(item, (inventory.get(item) || 0) + 1);
  carts.set(username, newItems);
  ctx.body = newItems;
});

// router.get('/inventory', ctx => {
//   console.log('Test');
//   ctx.body = getInventory()
// });

app.use(router.routes());

module.exports = {
  app: app.listen(3000),
  inventory,
  carts
};