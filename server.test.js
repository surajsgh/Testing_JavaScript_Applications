const fetch = require('isomorphic-fetch');
const app = require('./server');

const apiRoot = 'http://localhost:3000';

const addItems = (username, item) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, { method: 'POST'} );
}

const getItems = username => fetch(`${apiRoot}/carts/${username}/items`, { method: 'GET'});

// SOMETIMES WHILE PASSING TEST CASES, JEST DOESN'T EXIT. TO DETECT WHAT CAUSED THIS, WE USE --detectOpenHandle.
// USING --detectOpenHandle TELLS US WHAT CAUSED THAT ISSUE.
// WE USE afterAll HOOK TO CLOSE THE CONNECTION TO FIX THIS PROBLEM.
// ALTERNATIVE SOLUTION IS TO USE --forceExit IN NPM PACKAGE ALONG WITH --detectOpenHandle
afterAll(() => app.close());

test("Adding items to a cart", async () => {
  const initialItemsResponse = await getItems('Suraj');
  expect(initialItemsResponse.status).toEqual(404);

  const addItemsResponse = await addItems('Suraj', 'Cheesecake');
  expect(await addItemsResponse.json()).toEqual(['Cheesecake']);

  const finalItemsResponse = await getItems('Suraj');
  expect(await finalItemsResponse.json()).toEqual(['Cheesecake']);
})