const reg = /"\$\{(.+)\}"/g // 存在问题需要修复

const initialCompile = String => {
    String.prototype.compile = function (callback = $ => $) {
        if(typeof callback === 'string') return this.replace(reg, callback);
        return this.replace(reg, callback('$1'));
    }
}

const compile = (str, callback = $ => $) => {
    if(typeof callback === 'string') return this.replace(reg, callback);
    return str.replace(reg, callback('$1'));
}

module.exports = {
    initialCompile,
    compile,
}