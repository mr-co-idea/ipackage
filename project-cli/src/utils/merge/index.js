const { getType } = require('../type');
const { deepCopy } = require('../deepCopy');

function merge(obj, ...rest) {
    const type = getType(obj);
    let result = deepCopy(obj);

    rest.forEach(item => {
        if (result === undefined || item === undefined) {
            result = result || item;
        }
        else if (type === 'Array') {
            result = result.concat(item);
        }
        else if (getType(item) != type) {
            throw new Error('合并类型不一致');
        } else if (type === 'String' || type === 'Number') {
            result = item;
        }
        else if (type === 'Object') {
            const keys = Array.from(new Set([...Object.keys(result), ...Object.keys(item)]));

            for (let key of keys) {
                result[key] = merge(result[key], item[key]);
            }
        } else if (type === 'Array') {
            result = obj.concat(item);
        }
    })

    return result;
}

module.exports = {
    merge,
}