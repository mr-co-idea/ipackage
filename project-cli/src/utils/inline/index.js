function getParams(arr) {

    const params = { app: '' };

    const reg = /^--(\w+)$/;

    let list;

    if (reg.test(arr[0])) {
        list = arr;
    } else {
        params.app = arr[0];
        list = arr.splice(1);
    }

    for (let i = 0; i < list.length; i += 2) {
        if (list[i + 1] !== 'undifined' && list[i + 1] !== '' && reg.test(list[i])) {
            params[list[i].replace(reg, '$1')] = list[i + 1]
        }
    }

    return params;
}

module.exports = {
    getParams,
}