const fs = require('fs');
const path = require('path');

const pull = dirname => file => {
    const string = fs.readFileSync(path.join(dirname, file + '/index.js'), { encoding: 'utf-8' });
    return eval(string);
}

module.exports = {
    pull,
}