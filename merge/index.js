const { getType } = require('@ipackage/judge');
const { deepClone } = require('@ipackage/clone');

function commonMerge(sym, obj, ...rest) {
    const type = getType(obj);
    let result = deepClone(obj);

    rest.forEach(item => {
        if (result === undefined || item === undefined) {
            result = result || item;
        }
        else if (getType(item) !== type) {
            throw new Error('合并类型不一致');
        } else if (type === 'String' || type === 'Number') {
            result = item;
        }
        else if (type === 'Object') {
            const keys = Array.from(new Set([...Object.keys(result), ...Object.keys(item)]));

            for (let key of keys) {
                result[key] = commonMerge(sym, result[key], item[key]);
            }
        } else if (type === 'Array') {
            if (sym) {
                result = mergeArray(sym, result, item);
            } else {
                result = result.concat(item);
            }
        }
    })

    return result;
}

function mergeArray(sym, arr, ...rest) {
    let result = deepClone(arr);
    let destroy = Symbol('destroy');

    rest.forEach(item => {
        let list = result.concat(item);

        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {

                if (list[i][sym] && list[j][sym] && (list[i][sym] === list[j][sym])) {
                    list[i] = merge(list[i], list[j]);
                    list[i][sym] = list[j][sym];
                    list[j] = destroy;
                }
            }
        }

        result = list.filter(obj => obj !== destroy);
    });
    return result;
}

function merge(obj, ...rest) {
    return commonMerge(undefined, obj, ...rest);
}

function deepMerge(sym = Symbol.for('key')) {
    return (obj, ...rest) => {
        return commonMerge(sym, obj, ...rest);
    }
}

function mergeFuc(){
    
}

module.exports = {
    merge,
    deepMerge,
}