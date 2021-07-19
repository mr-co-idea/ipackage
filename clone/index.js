const { getType } = require('@ipackage/judge');

function deepClone(target) {
    const type = getType(target);

    if (type === 'Object') {
        const obj = Object.create(Object.getPrototypeOf(target));

        for (let key in target) {
            obj[key] = deepClone(target[key]);
        }

        const syms = Object.getOwnPropertySymbols(target);

        for (let sym of syms) {
            obj[sym] = deepClone(target[sym])
        }

        return obj;
    }
    else if (type === 'Array') {
        const arr = [];
        for (let item of target) {
            arr.push(deepClone(item));
        }

        return arr;
    }
    else {
        return target;
    }
}

module.exports = {
    deepClone,
}