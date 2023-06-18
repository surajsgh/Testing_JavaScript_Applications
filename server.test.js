const fetch = require('isomorphic-fetch');
const app = require('./server');

const apiRoot = 'http://localhost:3000';

const addItems = (username, item) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, { method: 'POST'} );
}

const getItems = username => fetch(`${apiRoot}/carts/${username}/items`, { method: 'GET'});

afterAll(() => app.close());

test("Adding items to a cart", async () => {
  const initialItemsResponse = await getItems('Suraj');
  expect(initialItemsResponse.status).toEqual(404);

  const addItemsResponse = await addItems('Suraj', 'Cheesecake');
  expect(await addItemsResponse.json()).toEqual(['Cheesecake']);

  const finalItemsResponse = await getItems('Suraj');
  expect(await finalItemsResponse.json()).toEqual(['Cheesecake']);
})