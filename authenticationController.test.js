const crypto = require('crypto');

const { hashPassword, credentialsAreValid } = require('./authenticationController');
const { users, app } = require('./server');

afterEach(() => users.clear());

afterAll(() => app.close());

//  TESTING MIDDLEWARE
describe('hash password', () => {
    test('hash password successful result', () => {
        const password = 'Test@1234';
        const hash = crypto.createHash('sha256');

        hash.update(password);
        const updatedPassword = hash.digest('hex');
        const expectedPassword = hashPassword('Test@1234');

        expect(updatedPassword).toBe(expectedPassword);
    });
});

describe('credentialsAreValid', () => {
    test('successful valid credentials', () => {
        users.set('test_user', { email: 'test@email.com', password: hashPassword('Test@1234')});
        const response = credentialsAreValid('test_user', 'Test@1234');
        expect(response).toBe(true);
    })
})