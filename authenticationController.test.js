const crypto = require('crypto');

const { hashPassword } = require('./authenticationController');

//  TESTING MIDDLEWARE
describe('hash password', () => {
    test('hash password successful result', () => {
        const password = 'Test@1234';
        const hash = crypto.createHash('sha256');

        hash.update(password);
        const updatedPassword = hash.digest('hex');
        const expectedPassword = hashPassword('Test@1234');

        expect(updatedPassword).toBe(expectedPassword);
    })
})