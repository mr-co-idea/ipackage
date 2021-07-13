const { runShell } = require('./shell'),
    { compile, initialCompile } = require('./compile'),
    { copy } = require('./copy'),
    { getType } = require('./type'),
    { deepCopy } = require('./deepCopy'),
    { merge } = require('./merge'),
    { getParams } = require('./inline'),
    { clear } = require('./clear');

module.exports = {
    runShell,
    compile,
    initialCompile,
    copy,
    getType,
    deepCopy,
    merge,
    getParams,
    clear,
}