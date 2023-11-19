const crypto = require('crypto');

const users = new Map();

const hashPassword = password => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

const credentialsAreValid = (username, password) => {
    const userExists = users.has(username);
    if(!userExists) {
        return false;
    }

    const userPassword = users.get(username).password;
    return userPassword === hashPassword(password);
}

const authenticationMiddleware = async (ctx, next) => {
    try {
        const authHeader = ctx.request.headers.authorization;
        const credentials = Buffer.from(authHeader.slice('basic'.length + 1), 'base64').toString();
        const [username, password] = credentials.split(':');

        console.log(username, password);
        console.log(credentialsAreValid(username, password));
        if(!credentialsAreValid(username, password)) {
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
    authenticationMiddleware,
    users
}