const crypto = require('crypto');

const { hashPassword, credentialsAreValid, authenticationMiddleware, users } = require('./authenticationController');
const { app } = require('./server');
const { db } = require('./dbConnection');

// afterEach(() => users.clear());

afterAll(() => app.close());

beforeEach(() => db('users').truncate());

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
    test('successful valid credentials', async () => {
        // users.set('test_user', { email: 'test@email.com', password: hashPassword('Test@1234')});
        await db('users').insert({
            username: 'test_user',
            passwordHash: hashPassword('Test@1234'),
            email: 'test@email.com'
        })
        const response = await credentialsAreValid('test_user', 'Test@1234');
        console.log(response);
        expect(response).toBe(true);
    });
});

describe('authenticationMiddleware', () => {
    test('returning an error if the credentials are not valid', async () => {
        const fakeAuth = Buffer.from('invalid:credentials').toString('base64');
        const ctx = {
            request: {
                headers: {
                    authorization: `Basic ${fakeAuth}`
                }
            }
        };

        const next = jest.fn();
        await authenticationMiddleware(ctx, next);
        expect(ctx).toEqual({
            ...ctx,
            status: 401,
            body: { message: 'Please provide valid credentials.'}
        });
    });
});