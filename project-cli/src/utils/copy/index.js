const fs = require('fs');
const path = require('path');


function copy(from, to) {
    if (!fs.existsSync(from)) return;
    if (fs.statSync(from).isDirectory()) {
        const ls = fs.readdirSync(from);
        fs.mkdirSync(to);
        ls.forEach(item => {
            copy(path.join(from, item), path.join(to, item));
        })
    } else {
        const origin = fs.createReadStream(from);
        const target = fs.createWriteStream(to);
        origin.pipe(target);
    }
}

module.exports = {
    copy,
}