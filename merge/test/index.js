const m1 = require('./m1');
const m2 = require('./m2');
const { deepMerge } = require('..');
const fs = require('fs');
const path = require('path');

const merge = deepMerge(Symbol.for('key'));

fs.writeFileSync(path.join(__dirname, './result.json'), JSON.stringify(merge(m1, m2), undefined, 4))