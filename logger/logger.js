const fs = require('fs');

const logger = {
    log : message => fs.appendFileSync('/tmp/logs.out', message + '\n')
}

module.exports = logger;