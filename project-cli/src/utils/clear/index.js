const { statSync, unlinkSync, rmdirSync, readdirSync } = require('fs');
const { join } = require('path');

function clear(path) {
    if (statSync(path).isDirectory()) {
        const ls = readdirSync(path);
        ls.forEach(child => {
            clear(join(path, child));
        })

        rmdirSync(path);
    } else {
        unlinkSync(path);
    }
}

module.exports = {
    clear,
}