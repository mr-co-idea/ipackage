const { getType } = require('../type');

function deepCopy(target) {
    const type = getType(target);

    if (type === 'Object') {
        const obj = {};

        for (let key in target) {
            obj[key] = deepCopy(target[key]);
        }

        return obj;
    }
    else if (type === 'Array') {
        const arr = [];
        for (let item of target) {
            arr.push(deepCopy(item));
        }

        return arr;
    }
    else {
        return target;
    }
}

module.exports = {
    deepCopy,
}