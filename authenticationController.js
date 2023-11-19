const crypto = require('crypto');

const { db } = require('./dbConnection');

const hashPassword = password => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

const credentialsAreValid = async (username, password) => {
    const user = await db('users').select().where({ username }).first();
    if(!user) return false;
    return user.passwordHash === hashPassword(password);
}

const authenticationMiddleware = async (ctx, next) => {
    try {
        const authHeader = ctx.request.headers.authorization;
        const credentials = Buffer.from(authHeader.slice('basic'.length + 1), 'base64').toString();
        const [username, password] = credentials.split(':');

        if(!await credentialsAreValid(username, password)) {
            throw new Error('Invalid Credentials');
        }
    } catch (error) {
        console.log('Test');
        ctx.status = 401;
        ctx.body = { message: 'Please provide valid credentials.'};
        return;
    }
    next();
}

module.exports = {
    hashPassword,
    credentialsAreValid,
    authenticationMiddleware
}