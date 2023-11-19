const crypto = require('crypto');
const { users } = require('./server');

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

module.exports = {
    hashPassword,
    credentialsAreValid
}