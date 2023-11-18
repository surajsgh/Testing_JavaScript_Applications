const { carts, addItemToCart } = require('./cartController');
const { inventory } = require('./inventoryController');
const logger = require('./logger/logger');
const fs = require('fs');

describe('cartController', () => {
    beforeEach(() => fs.writeFileSync('/tmp/logs.out', ''));

    afterAll(() => {
        carts.clear();
        inventory.clear();
    });

    test('adding available items to the cart', () => {
        inventory.set('cheesecake', 1);
        carts.set('test_user', []);
        const newItems = addItemToCart('test_user', 'cheesecake');
        expect(newItems).toEqual(['cheesecake']);
    })

    test('adding unavailable items to the cart', () => {
        inventory.set('cheesecake', 0);
        carts.set('test_user', []);

        try {
            addItemToCart('test_user', 'cheesecake');
        } catch (error) {
            console.log(error.message);
            expect(error.message).toBe('cheesecake is unavailable.');
            expect(error.statusCode).toBe(404);
        }
        expect(inventory.get('cheesecake')).toBe(0);
        expect(carts.get('test_user')).toEqual([]);
        expect.assertions(4);
    })

    test('logging added items', () => {
        inventory.set('cheesecake', 1);
        carts.set('test_user', []);
        addItemToCart('test_user', 'cheesecake');
        const content = fs.readFileSync('/tmp/logs.out', 'utf-8');
        expect(content).toContain('cheesecake has been added to the cart.\n');
    })
})