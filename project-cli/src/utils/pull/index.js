const fs = require('fs');
const path = require('path');

const pull = dirname => file => {
    if (!/.+\.js$/.test(file)) file += '/index.js';
    const string = fs.readFileSync(path.join(dirname, file), { encoding: 'utf-8' });
    return eval(string);
}

module.exports = {
    pull,
}